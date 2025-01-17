@extends('layouts.app')

@section('content')

<link href="{{asset('css/dashboard.css')}}" rel="stylesheet" />

@if(Session::get('modifieInfo'))
<span class="modifieInfo"></span>
@endif

@if(Session::get('modifiePassword'))
<span class="modifiePassword"></span>
@endif

<div class="">
    <div class="row"> 
    
        <div class="col s12 m12">
            <div class="card">
                <div class="card-content flex-center">
                    <h4>Bienvenue!</h4><h4 class="">{{$nom}}</h4>
                </div>
                <div class="card-content">
                    <div class="flex-row space">    
                        <h6>Informations personnelles</h6>
                        <a href="{{ route('custom.edit', $id)}}">
                            <i class="material-icons right black-text small">edit</i>
                        </a>
                    </div>   
                    
                    <div class="flex-row space">   
                        <div  class="flex-row"> 
                            <i class="small material-icons black-text">account_circle</i>
                            <p>{{$nom}}</p>
                        </div>    
                    </div>
                   
                    <div class="flex-row space">    
                        <div  class="flex-row">
                            <i class="small material-icons black-text">email</i>
                            <p>{{$courriel}}</p>    
                        </div>    
                    </div>
                    

                    <div class="flex-row space">    
                        <div  class="flex-row">
                            <i class="small material-icons black-text">cake</i>
                            <p>{{$date_naissance}}</p>  
                        </div>    
                    </div>    
                      
                    
                </div>
            </div>

            <div class="card">
                <div class="card-content">
                    
                        <div class="flex-row space" >    
                            <div class="flex-row space">
                                <i class="small material-icons black-text">account_box</i>
                                <h6>Mot de passe</h6>   
                            </div>  
                            <a href="{{ route('password.edit', $id)}}">
                            <i class="material-icons right black-text small">edit</i>
                            </a>

                        </div>   
                         


                        
                </div>
            </div>

            @if(session('user')!== null && session('user')->admin !== 1)
            <div class="card">
                <div class="card-content hoverclass">
                    <a href="{{ route('cellier')}}">
                    <div class="flex-row">
                    <i class="small material-icons black-text">chevron_left</i>
                    <h6>Vos celliers</h6>
                    </div> </a>
                </div>
            </div>
            @endif


        </div>
    </div>
</div>


@endsection

<script src="{{asset('js/dashboard.js')}}"></script>





