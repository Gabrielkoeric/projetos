<?php

namespace App\Http\Controllers;

use App\Models\Cor;
use Illuminate\Http\Request;


function destroy($id)
{

}

class CorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cores = Cor::all();
        $mensagemSucesso = $request->session()->get('mensagem.sucesso');

        return view('cores.index')->with('cores', $cores)->with('mensagemSucesso', $mensagemSucesso);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('cores.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $nomeCor = $request->input('nome');
        $cor = new Cor();
        $cor->cores_nome = $nomeCor;
        $cor->save();
        return redirect('/cor')->with('mensagem.sucesso', 'Cor Inserida com Sucesso');



       // $cor = Cor::create($request->all());

       // return to_route('cor.index')->with('mensagem.sucesso', 'Cor Inserida com Sucesso');
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
    public function edit(Cor $cor)
    {
        return view('cores.edit')->with('cor', $cor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Cor $cor, Request $request)
    {
      $cor->cores_nome = $request->nome;
      $cor->save();

      return to_route('cor.index')->with('mensagem.sucesso', 'Cor Alterada com Sucesso');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cor $cor)
    {
        $cor->delete();
        return to_route('cor.index')->with('mensagem.sucesso', 'Cor Removida com Sucesso');
    }
}



