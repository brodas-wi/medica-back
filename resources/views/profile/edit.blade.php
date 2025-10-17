@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="max-w-3xl mx-auto">
            <h1 class="text-2xl font-bold text-secondary mb-6">Mi Perfil</h1>

            @if (session('success'))
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-6">
                    {{ session('success') }}
                </div>
            @endif

            <div class="bg-white shadow p-6 mb-6">
                <h2 class="text-xl font-semibold text-primary mb-4">
                    <i class="ri-user-3-line mr-1"></i> Información Personal
                </h2>

                <form action="{{ route('profile.update') }}" method="POST">
                    @csrf
                    @method('PUT')

                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                        <input type="text" name="name" id="name"
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('name') border-red-500 @enderror"
                            value="{{ old('name', $user->name) }}" required>
                        @error('name')
                            <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                        <div class="py-2 px-3 bg-gray-100 text-gray-700 rounded-full">
                            {{ $user->email }}
                        </div>
                        <p class="text-xs text-gray-500 mt-1">El correo electrónico no puede ser modificado.</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Rol</label>
                        <div class="py-2 px-3 bg-gray-100 text-gray-700 rounded-full">
                            {{ $user->role->name ?? 'Sin rol asignado' }}
                        </div>
                    </div>

                    <div class="flex items-center">
                        <button type="submit"
                            class="bg-primary hover:bg-opacity-90 rounded-full text-white font-bold py-2 px-4">
                            <i class="ri-save-line mr-1"></i> Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>

            <!-- Password Change Section -->
            <div class="bg-white shadow p-6">
                <h2 class="text-xl font-semibold text-primary mb-4">
                    <i class="ri-lock-password-line mr-1"></i> Cambiar Contraseña
                </h2>

                <form action="{{ route('profile.password.update') }}" method="POST">
                    @csrf
                    @method('PUT')

                    <div class="mb-4">
                        <label for="current_password" class="block text-gray-700 text-sm font-bold mb-2">Contraseña
                            Actual</label>
                        <div class="relative">
                            <input type="password" name="current_password" id="current_password"
                                class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('current_password') border-red-500 @enderror"
                                required>
                            <button type="button"
                                class="toggle-password absolute right-0 border-l top-0 h-full px-3 bg-gray-200 hover:bg-gray-300 rounded-r-full"
                                data-target="current_password">
                                <i class="ri-eye-line"></i>
                            </button>
                        </div>
                        @error('current_password')
                            <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-4">
                        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Nueva Contraseña</label>
                        <div class="flex gap-2">
                            <div class="relative flex-grow">
                                <input type="password" name="password" id="password"
                                    class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('password') border-red-500 @enderror"
                                    required>
                                <button type="button"
                                    class="toggle-password absolute border-l right-0 top-0 h-full px-3 bg-gray-200 hover:bg-gray-300 rounded-r-full"
                                    data-target="password">
                                    <i class="ri-eye-line"></i>
                                </button>
                            </div>
                            <button type="button" id="generatePasswordBtn"
                                class="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center">
                                <i class="ri-refresh-line"></i>
                            </button>
                        </div>
                        @error('password')
                            <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-6">
                        <label for="password_confirmation" class="block text-gray-700 text-sm font-bold mb-2">Confirmar
                            Contraseña</label>
                        <div class="relative">
                            <input type="password" name="password_confirmation" id="password_confirmation"
                                class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full"
                                required>
                            <button type="button"
                                class="toggle-password absolute border-l right-0 top-0 h-full px-3 bg-gray-200 hover:bg-gray-300 rounded-r-full"
                                data-target="password_confirmation">
                                <i class="ri-eye-line"></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center">
                        <button type="submit" class="bg-primary rounded-full hover:bg-opacity-90 text-white font-bold py-2 px-4">
                            <i class="ri-lock-line mr-1"></i> Actualizar Contraseña
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Generate password button functionality
            const generatePasswordBtn = document.getElementById('generatePasswordBtn');
            const passwordInput = document.getElementById('password');
            const passwordConfirmationInput = document.getElementById('password_confirmation');

            generatePasswordBtn.addEventListener('click', function() {
                fetch('{{ route('profile.generate.password') }}')
                    .then(response => response.json())
                    .then(data => {
                        passwordInput.value = data.password;
                        passwordConfirmationInput.value = data.password;

                        // Show password temporarily
                        passwordInput.type = 'text';
                        passwordConfirmationInput.type = 'text';

                        // Change icons temporarily
                        document.querySelectorAll(
                            '.toggle-password[data-target="password"] i, .toggle-password[data-target="password_confirmation"] i'
                        ).forEach(function(icon) {
                            icon.classList.remove('ri-eye-line');
                            icon.classList.add('ri-eye-off-line');
                        });

                        // Back to password type after 5 seconds
                        setTimeout(() => {
                            passwordInput.type = 'password';
                            passwordConfirmationInput.type = 'password';

                            // Restore icons
                            document.querySelectorAll(
                                '.toggle-password[data-target="password"] i, .toggle-password[data-target="password_confirmation"] i'
                            ).forEach(function(icon) {
                                icon.classList.remove('ri-eye-off-line');
                                icon.classList.add('ri-eye-line');
                            });
                        }, 5000);
                    })
                    .catch(error => console.error('Error:', error));
            });

            // Show/hide password functionality
            const togglePasswordButtons = document.querySelectorAll('.toggle-password');

            togglePasswordButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    const passwordField = document.getElementById(targetId);
                    const icon = this.querySelector('i');

                    // Change password type and icon
                    if (passwordField.type === 'password') {
                        passwordField.type = 'text';
                        icon.classList.remove('ri-eye-line');
                        icon.classList.add('ri-eye-off-line');
                    } else {
                        passwordField.type = 'password';
                        icon.classList.remove('ri-eye-off-line');
                        icon.classList.add('ri-eye-line');
                    }
                });
            });
        });
    </script>
@endsection
