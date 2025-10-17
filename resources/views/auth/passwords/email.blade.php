@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center h-[calc(100vh-98px)] bg-gray-100">
        <div class="w-full max-w-md">
            <div class="bg-white shadow-md p-8">
                <div class="text-center mb-6">
                    <h2 class="text-2xl font-semibold text-primary">{{ __('Recuperar Contraseña') }}</h2>
                </div>

                @if (session('status'))
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4" role="alert">
                        {{ session('status') }}
                    </div>
                @endif

                <form method="POST" action="{{ route('password.email') }}">
                    @csrf

                    <div class="mb-6">
                        <label for="email"
                            class="block text-gray-700 text-sm font-bold mb-2">{{ __('Correo Electrónico') }}</label>
                        <input id="email" type="email"
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('email') border-red-500 @enderror"
                            name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                        @error('email')
                            <span class="text-red-500 text-xs italic" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="flex items-center justify-between space-x-2">
                        <a href="{{ route('login') }}"
                            class="border border-primary text-primary font-bold py-2 px-4 focus:outline-none hover:bg-gray-50 focus:shadow-outline flex-1 text-center">
                            <i class="ri-arrow-left-line mr-1 text-sm"></i>
                            {{ __('Volver al inicio') }}
                        </a>

                        <button type="submit"
                            class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline flex-1">
                            {{ __('Enviar Enlace') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
