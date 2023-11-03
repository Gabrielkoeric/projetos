<?php

namespace App\Http\Controllers;

use App\Models\Lote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $lotes = DB::table('lote')
            ->select('lote.id_lote', 'lote.numero_lote', 'lote.quantidade_lote', 'lote.quantidade_lote_disponivel', 'lote.ativo', 'lote.adicional_lote', 'ingressos.nome as nome_ingresso')
            ->join('ingressos', 'lote.id_ingressos', '=', 'ingressos.id_ingressos')
            ->get();
        $mensagemSucesso = $request->session()->get('mensagem.sucesso');
        //dd("$lotes");
        return view('lote.index')->with('lotes', $lotes)->with('mensagemSucesso', $mensagemSucesso);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $ingressos = DB::table('ingressos')
            ->select('id_ingressos', 'nome')
            ->get();
        //dd("$ingressos");
        return view('lote.create')->with('ingressos', $ingressos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd("$request");
        $numeroLote = $request->input('numeroLote');
        $quantidadeLote = $request->input('quantidadeLote');
        $quantidadeLoteDisponivel = $request->input('quantidadeLoteDisponivel');
        $ativo = $request->input('ativo');
        $adicionalLote = $request->input('adicionalLote');
        $ingresso = $request->input('ingresso');
        $ativo = ($ativo === 'on') ? 1 : 0;

        $dados = [
            'numero_lote' => $numeroLote,
            'quantidade_lote' => $quantidadeLote,
            'quantidade_lote_disponivel' => $quantidadeLoteDisponivel,
            'adicional_lote' => $adicionalLote,
            'ativo' => $ativo,
            'id_ingressos' => $ingresso
            ];
        //dd("$numeroLote, $quantidadeLote, $quantidadeLoteDisponivel, $ativo, $ingresso");
        DB::table('lote')->insertGetId($dados);
        return redirect('/lote')->with('mensagem.sucesso', 'Lote inserido com sucesso!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Lote $lote)
    {
        //dd("$ingresso");
        $ingressos = DB::table('ingressos')
            ->select('id_ingressos', 'nome')
            ->get();
        return view('lote.edit')->with('lote', $lote)->with('ingressos', $ingressos);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_lote)
    {
        $ativo = $request->ativo;
        $ativo = ($ativo === 'on') ? 1 : 0;
        DB::table('lote')
            ->where('id_lote', $id_lote)
            ->update([
                'numero_lote' => $request->numeroLote,
                'quantidade_lote' => $request->quantidadeLote,
                'quantidade_lote_disponivel' => $request->quantidadeLoteDisponivel,
                'ativo' => $ativo,
                'id_ingressos' => $request->ingresso,
            ]);
        return redirect()->route('lote.index')->with('mensagem.sucesso', 'Ingresso Alterado com Sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lote $lote)
    {
        $lote->delete();
        return to_route('lote.index')->with('mensagem.sucesso', 'Lote Removido com Sucesso!');
    }
}
