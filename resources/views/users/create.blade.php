@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-6">
    <div class="max-w-3xl mx-auto">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-secondary">Nuevo Usuario</h1>
            <a href="{{ route('users.index') }}"
                class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                <i class="ri-arrow-left-line mr-1"></i>Volver a Usuarios
            </a>
        </div>

        <div class="bg-white shadow p-6">
            <form action="{{ route('users.store') }}" method="POST" id="userForm">
                @csrf

                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input type="text" name="name" id="name" placeholder="Ingrese el nombre completo"
                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('name') border-red-500 @enderror"
                        value="{{ old('name') }}" required>
                    @error('name')
                    <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                    @enderror
                    <p class="text-gray-500 text-xs mt-1">Solo letras y espacios permitidos</p>
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                    <input type="email" name="email" id="email" placeholder="ejemplo@dominio.com"
                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('email') border-red-500 @enderror"
                        value="{{ old('email') }}" required>
                    @error('email')
                    <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                    <div class="flex gap-2">
                        <div class="relative flex-grow">
                            <input type="password" name="password" id="password"
                                class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('password') border-red-500 @enderror"
                                required>
                            <button type="button"
                                class="toggle-password absolute right-0 top-0 h-full px-3 bg-gray-200 hover:bg-gray-300 border-l rounded-r-full"
                                data-target="password">
                                <i class="ri-eye-line"></i>
                            </button>
                        </div>
                        <button type="button" id="generate-password"
                            class="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center">
                            <i class="ri-refresh-line"></i>
                        </button>
                    </div>
                    @error('password')
                    <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                    @enderror
                    <div class="mt-2">
                        <div class="password-strength hidden">
                            <div class="flex mb-1">
                                <div class="password-strength-label text-xs mr-2">Fortaleza:</div>
                                <div class="password-strength-text text-xs"></div>
                            </div>
                            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div class="password-strength-meter h-full w-0 transition-all duration-300"></div>
                            </div>
                        </div>
                        <ul class="text-xs text-gray-500 mt-1 ml-4 list-disc">
                            <li>Al menos 8 caracteres</li>
                            <li>Al menos una letra mayúscula y una minúscula</li>
                            <li>Al menos un número</li>
                            <li>Al menos un símbolo (@, #, $, etc.)</li>
                        </ul>
                    </div>
                </div>

                <div class="mb-4">
                    <label for="password_confirmation" class="block text-gray-700 text-sm font-bold mb-2">Confirmar
                        Contraseña</label>
                    <div class="relative">
                        <input type="password" name="password_confirmation" id="password_confirmation"
                            class="shadow appearance-none border w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full"
                            required>
                        <button type="button"
                            class="toggle-password absolute right-0 top-0 h-full px-3 bg-gray-200 hover:bg-gray-300 border-l rounded-r-full"
                            data-target="password_confirmation">
                            <i class="ri-eye-line"></i>
                        </button>
                    </div>
                </div>

                <div class="mb-4">
                    <label for="role" class="block text-gray-700 text-sm font-bold mb-2">Rol</label>
                    <select name="role" id="role"
                        class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('role') border-red-500 @enderror"
                        required>
                        <option value="">Seleccionar Rol</option>
                        @foreach ($roles as $role)
                        <option value="{{ $role->name }}" {{ old('role') == $role->name ? 'selected' : '' }}>
                            {{ $role->name }}
                        </option>
                        @endforeach
                    </select>
                    @error('role')
                    <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex items-center mb-4">
                    <label for="is_active" class="text-sm font-bold text-gray-700 mr-3">Estado:</label>
                    <div class="toggle-switch">
                        <input type="checkbox" id="is_active" name="is_active" class="toggle-switch-checkbox"
                            {{ old('is_active', isset($user) ? $user->is_active : true) ? 'checked' : '' }}>
                        <label class="toggle-switch-label" for="is_active">
                            <span class="toggle-switch-inner"></span>
                            <span class="toggle-switch-switch"></span>
                        </label>
                    </div>
                    <span class="ml-2 text-sm text-gray-700" id="toggle-status">
                        {{ old('is_active', isset($user) ? $user->is_active : true) ? 'Activo' : 'Inactivo' }}
                    </span>
                </div>

                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                        <i class="ri-user-add-line mr-1"></i>Crear Usuario
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        setupLoadingIndicator('userForm');

        // Configurar la funcionalidad para mostrar/ocultar contraseñas
        const togglePasswordButtons = document.querySelectorAll('.toggle-password');
        togglePasswordButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const passwordField = document.getElementById(targetId);
                const icon = this.querySelector('i');

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

        // Generar contraseña
        const generatePasswordButton = document.getElementById('generate-password');
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('password_confirmation');

        generatePasswordButton.addEventListener('click', function() {
            const password = generateStrongPassword();
            passwordField.type = 'text';
            passwordField.value = password;
            confirmPasswordField.type = 'text';
            confirmPasswordField.value = password;

            // Cambiar los iconos
            document.querySelectorAll('.toggle-password').forEach(function(button) {
                const icon = button.querySelector('i');
                icon.classList.remove('ri-eye-line');
                icon.classList.add('ri-eye-off-line');
            });

            // Actualizar medidor de fortaleza
            updatePasswordStrength(password);

            // Mostrar la contraseña por 5 segundos, luego ocultarla
            setTimeout(function() {
                passwordField.type = 'password';
                confirmPasswordField.type = 'password';

                // Restaurar los iconos
                document.querySelectorAll('.toggle-password').forEach(function(button) {
                    const icon = button.querySelector('i');
                    icon.classList.remove('ri-eye-off-line');
                    icon.classList.add('ri-eye-line');
                });
            }, 5000);
        });

        // Evaluar fortaleza de la contraseña
        const passwordStrengthContainer = document.querySelector('.password-strength');
        const passwordStrengthMeter = document.querySelector('.password-strength-meter');
        const passwordStrengthText = document.querySelector('.password-strength-text');

        passwordField.addEventListener('input', function() {
            const password = this.value;
            if (password) {
                passwordStrengthContainer.classList.remove('hidden');
                updatePasswordStrength(password);
            } else {
                passwordStrengthContainer.classList.add('hidden');
            }
        });

        function updatePasswordStrength(password) {
            const strength = calculatePasswordStrength(password);

            // Actualizar el texto
            let strengthText = '';
            let strengthClass = '';

            if (strength < 40) {
                strengthText = 'Débil';
                strengthClass = 'bg-red-500';
            } else if (strength < 80) {
                strengthText = 'Media';
                strengthClass = 'bg-yellow-500';
            } else {
                strengthText = 'Fuerte';
                strengthClass = 'bg-green-500';
            }

            passwordStrengthText.textContent = strengthText;
            passwordStrengthContainer.classList.remove('hidden');

            // Actualizar el medidor
            passwordStrengthMeter.className = 'password-strength-meter h-full transition-all duration-300 ' +
                strengthClass;
            passwordStrengthMeter.style.width = strength + '%';
        }

        function calculatePasswordStrength(password) {
            let strength = 0;

            if (password.length >= 8) strength += 20;
            if (password.match(/[a-z]+/)) strength += 10;
            if (password.match(/[A-Z]+/)) strength += 20;
            if (password.match(/[0-9]+/)) strength += 20;
            if (password.match(/[^a-zA-Z0-9]+/)) strength += 30;

            return Math.min(100, strength);
        }

        function generateStrongPassword() {
            const lowercase = 'abcdefghijklmnopqrstuvwxyz';
            const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';
            const symbols = '!@#$%^&*()_+{}:"<>?|[];\',./`~';

            const allChars = lowercase + uppercase + numbers + symbols;
            let password = '';

            // Asegurar al menos uno de cada tipo
            password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
            password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
            password += numbers.charAt(Math.floor(Math.random() * numbers.length));
            password += symbols.charAt(Math.floor(Math.random() * symbols.length));

            // Generar el resto de la contraseña
            for (let i = 0; i < 8; i++) {
                password += allChars.charAt(Math.floor(Math.random() * allChars.length));
            }

            // Mezclar los caracteres
            return password.split('').sort(() => 0.5 - Math.random()).join('');
        }
    });
</script>
@endsection
@endsection