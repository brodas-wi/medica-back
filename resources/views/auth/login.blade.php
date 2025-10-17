@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center h-[calc(100vh-98px)] bg-gray-100">
        <div class="w-full max-w-md">
            <div class="bg-white shadow-md p-8">
                <div class="text-center mb-6">
                    <h2 class="text-2xl font-semibold text-primary">{{ __('Iniciar Sesión') }}</h2>
                </div>

                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <div class="mb-4">
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

                    <div class="mb-6">
                        <label for="password"
                            class="block text-gray-700 text-sm font-bold mb-2">{{ __('Contraseña') }}</label>
                        <div class="relative">
                            <input id="password" type="password"
                                class="shadow appearance-none border w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('password') border-red-500 @enderror"
                                name="password" required autocomplete="current-password">
                            <button type="button" id="togglePassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800">
                                <i id="eyeIcon" class="ri-eye-line text-lg"></i>
                            </button>
                        </div>

                        @error('password')
                            <span class="text-red-500 text-xs italic" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="mb-6">
                        <div class="flex items-center">
                            <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}
                                class="mr-2">
                            <label class="text-sm text-gray-700" for="remember">
                                {{ __('Recordarme') }}
                            </label>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <button type="submit"
                            class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full">
                            {{ __('Iniciar Sesión') }}
                        </button>
                    </div>

                    @if (Route::has('password.request'))
                        <div class="text-center mt-4">
                            <a class="text-sm text-primary hover:underline" href="{{ route('password.request') }}">
                                {{ __('¿Olvidaste tu Contraseña?') }}
                            </a>
                        </div>
                    @endif
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const togglePassword = document.getElementById('togglePassword');
        const password = document.getElementById('password');
        const eyeIcon = document.getElementById('eyeIcon');

        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);

            if (type === 'password') {
                eyeIcon.className = 'ri-eye-line text-lg';
            } else {
                eyeIcon.className = 'ri-eye-off-line text-lg';
            }
        });
    });
</script>
@endpush
