# Ajustes de Alerta - Tareas

- [ ] Modificar `AlertContext.jsx` para centralizar el estado de alerta:
    - [ ] Agregar estados `showAlert` y `alertMessage` al contexto.
- [ ] Modificar `Counter.jsx` para utilizar el contexto global:
    - [ ] Remover estados locales `showAlert`/`alertMessage`.
    - [ ] Remover `<Alert>` de la estructura del componente.
    - [ ] Invocar setters del contexto cuando finalice el tiempo.
- [ ] Modificar `App.jsx` para renderizar `<Alert />` en la raíz.
- [ ] Rediseñar `Alert.jsx` para el efecto de desenfoque de pantalla completa y diseño neutro:
    - [ ] Consumir estados desde `AlertContext`.
    - [ ] Añadir `backdrop-blur-md bg-black/25` al overlay de fondo.
    - [ ] Rediseñar la caja y el botón cerrar con el estilo piedra neutro.
- [ ] Verificar:
    - [ ] Fin de ciclo del temporizador y despliegue del modal a pantalla completa con fondo borroso.
