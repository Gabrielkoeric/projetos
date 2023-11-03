<form action="{{$action}}" method="post" enctype="multipart/form-data">
    @csrf
    @isset($nome)
        @method('PUT')
    @endisset
    <div class="mb-3">
        <label for="nome" class="form-label">Nome:</label>
        <input type="text" id="nome" name="nome" class="form-control" @isset($nome) value="{{$nome}}" @endisset>

        <label for="descricao" class="form-label">Descricao</label>
        <input type="text" id="descricao" name="descricao" class="form-control" @isset($descricao) value="{{$descricao}}" @endisset>

        <label for="quantidade" class="form-label">Quantidade</label>
        <input type="number" id="quantidade" name="quantidade" class="form-control" @isset($quantidade) value="{{$quantidade}}" @endisset>

        <label for="quantidadeDisponivel" class="form-label">Quantidade Disponivel</label>
        <input type="number" id="quantidadeDisponivel" name="quantidadeDisponivel" class="form-control" step="0.01" @isset($quantidadeDisponivel) value="{{$quantidadeDisponivel}}" @endisset>

        <label for="valor" class="form-label">Valor</label>
        <input type="number" id="valor" name="valor" class="form-control" step="0.01" @isset($valor) value="{{$valor}}" @endisset>
    </div>
    <!--
    <div class="row mb-3">
        <div class="col-12">
            <label for="imagemProduto">Imagem Produto</label>
            <input type="file" id="imagemProduto" name="imagemProduto" class="form-control" accept="image/gif, image/jpeg, image/png">
        </div>
    </div>-->

    <button type="submit" class="btn btn-primary">Salvar</button>
    <a href="{{route('ingressos.index')}}" class="btn btn-danger">Cancelar</a>
</form>
