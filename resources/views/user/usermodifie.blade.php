@extends('layouts.app')

@section('content')

<div class="flex-box">
  <div class="row"> 
    
    <div class="col s12 m12">
      <div class="card">
        <div class="card-content flex-center entete-login">
          <h1 class="titre-formulaire">Gérer mon compte</h1>
          <!-- <img src="{{asset('assets/icon/bouteille-diagonale.svg')}}" class="center" alt="icone bouteille diagonale"></a> -->
        </div>

        <div class="card-content">
          <form action="{{ route('custom.update', $id) }}" method="POST">
          @method('PUT')
          @csrf
            <div class="row">
              <div class="input-field col s12">
                  <input id="nom" type="text" class="validate" name="nom" value="{{ $nom }}">
                  <label for="nom">Nom et prénom</label>
                  @if ($errors->has('nom'))
                      <span class="red-text">{{ $errors->first('nom') }}</span>
                  @endif
              </div>

              <div class="input-field col s12">
                  <input id="date_naissance" type="text" class="validate" name="date_naissance" value="{{ $date_naissance }}">
                  <label for="date_naissance">Date de naissance(aaaa-mm-jj)</label>
                  @if ($errors->has('date_naissance'))
                      <span class="red-text">{{ $errors->first('date_naissance') }}</span>
                  @endif
              </div>

              <div class="input-field col s12">
                <input id="courriel" type="email" class="validate" name="courriel" value="{{ $courriel }}">
                <label for="courriel">Adresse de courriel</label>
                @if ($errors->has('courriel'))
                    <span class="red-text">{{ $errors->first('courriel') }}</span>
                @endif
              </div>

              <div class="input-field col s12">
                <input id="Password" type="password" class="validate" name="password" >
                <label for="Password">Mot de passe</label>
                @if ($errors->has('password'))
                    <span class="red-text">{{ $errors->first('password') }}</span>
                @endif
              </div>

              <div class="input-field col s12">
                <input id="Password" type="password" class="validate" name="nouveauMotDePasse" >
                <label for="Password">Nouveau mot de passe</label>
                @if ($errors->has('nouveauMotDePasse'))
                    <span class="red-text">{{ $errors->first('nouveauMotDePasse') }}</span>
                @endif
              </div>
            
              <div class="input-field col s12 flex-row">  
                <a href="/dashboard" class="btn waves-effect waves-light button btn-annuler"  name="annuler">Annuler</a>
                <button type="submit" class="btn waves-effect waves-light button btn-modifier">Modifier</button>
              </div>
              @if(session('success'))
                <div class="text-center p-t-12">
                <span class="red-text">{{ session('success')}}</span>
            </div>
            @endif
              
            </div>	
          </form>
        </div>
      </div>
    </div>
  </div>
</div>


@endsection