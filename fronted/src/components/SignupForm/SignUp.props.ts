interface FormElements extends HTMLFormControlsCollection {
  formName: HTMLInputElement;
  formLastName: HTMLInputElement;
  formLogin: HTMLInputElement;
  formEmail: HTMLInputElement;
  formBasicPassword: HTMLInputElement;
  formRepeatPassword: HTMLInputElement;
  formBtnSubmit: HTMLButtonElement;

}

export default interface SignUpFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
