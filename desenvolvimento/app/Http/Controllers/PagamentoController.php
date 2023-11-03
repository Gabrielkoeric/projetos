<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use MercadoPago\Item;
use MercadoPago\Payer;
use MercadoPago\Preference;



class PagamentoController extends Controller
{
    public function createPayment(Request $request)
    {
        Log::info('vc esta no pagamento');
        /*$id = $request->session()->get('pagamnto')['id'];
        $valor = $request->session()->get('pagamnto')['valor'];
        $hash = $request->session()->get('hash')['hash'];*/
        $pagamento = session('pagamento');

        $id = $request->cookie('id');
        $valor = $request->cookie('valor');
        $hash = $request->cookie('hash');
               $nome = Auth::user()->name;
        $email = Auth::user()->email;
        $accessToken = config('services.mercado_pago.access_token');
        // Configure suas credenciais do MercadoPago
        \MercadoPago\SDK::setAccessToken("$accessToken");

        // Crie um item de compra
        $item = new Item();
        $item->id = "$id";
        $item->title = "Compra #$id";
        $item->quantity = 1;
        $item->currency_id = 'BRL'; // Moeda em Reais
        $item->unit_price = $valor; // Preço do produto

        // Crie um comprador (payer)
        $payer = new Payer();
        $payer->name = "$nome";
        $payer->email = $email;

        // Crie uma preferência de pagamento
        $preference = new Preference();
        $preference->items = [$item];
        $preference->payer = $payer;
        $preference->external_reference = $hash;
        $preference->back_urls = [
            'success' => route('payment.secesso'), // Rota de sucesso
            'failure' => route('payment.flaha'), // Rota de falha
            'pending' => route('payment.pendente'), // Rota pendente
        ];
        $preference->auto_return = 'approved'; // Redirecionamento automático após pagamento aprovado

        // Salve a preferência e obtenha a URL de pagamento
        $preference->save();
        $paymentUrl = $preference->init_point;
        DB::table('compras')
            ->where('hash', $hash)
            ->update([
                'link_pagamento' => $paymentUrl,
            ]);
        // Redirecione o usuário para a página de pagamento do MercadoPago
        return redirect($paymentUrl);
    }

    public function secesso(Request $request){
        $collectionStatus = $request->input('collection_status');
        $status = $request->input('status');
        $externalReference = $request->input('external_reference');

        DB::table('compras')
            ->where('hash', $externalReference) // Substitua $idDaCompra pelo ID da compra que você deseja atualizar
            ->update(['status' => $status]);

        return to_route('home.index');
        //dd("sucesso, $collectionStatus, $status, $externalReference");
    }

    public function flaha(){
        dd("flaha");
    }

    public function pendente(){
        dd("pendente");
    }
}
