import { MythixUIComponent } from '@cdn/mythix-ui-core@1';

export class MythixUIModal extends MythixUIComponent {
  static tagName = 'mythix-modal';

  get $dialog() {
    return this.select('dialog').first()[0];
  }

  get returnValue() {
    if (!this.$dialog)
      return null;

    return this.$dialog.returnValue;
  }

  set returnValue(newValue) {
    this.$dialog.returnValue = newValue;
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(set) {
    if (set)
      this.setAttribute('open', '');
    else
      this.removeAttribute('open');
  }

  setReturnValue(value) {
    this.returnValue = value;
  }

  onHeaderCaptionSlotChange() {
  }

  onHeaderButtonClick(event) {
    if (!event.defaultPrevented)
      this.close();
  }

  onHeaderButtonsSlotChange() {
    this.select({ slotted: true }, 'button')
      .slot('header-buttons')
      .off('click', this.onHeaderButtonClick)
      .on('click', this.onHeaderButtonClick);
  }

  onMainSlotChange() {
  }

  onFooterButtonClick(event) {
    if (!event.defaultPrevented)
      this.close();
  }

  onFooterSlotChange() {
    this.select({ slotted: true }, 'button')
      .slot('footer')
      .off('click', this.onFooterButtonClick)
      .on('click', this.onFooterButtonClick);
  }

  close(returnValue) {
    try {
      this.$dialog.close(returnValue);
    } catch (e) {}
  }

  show() {
    try {
      this.$dialog.show();
    } catch (e) {}
  }

  showModal() {
    try {
      this.$dialog.showModal();
    } catch (e) {}
  }

  mounted() {
    super.mounted();

    this.$dialog.addEventListener('close', () => {
      this.dispatchEvent(new Event('close'));
    });

    this.onHeaderButtonsSlotChange();
    this.onMainSlotChange();
    this.onFooterSlotChange();

    if (this.open)
      this.show();

    this.$dialog.addEventListener('click', (event) => {
      if (this.isAttributeTruthy('autoclose') && event.target === this.$dialog)
        this.close(null);
    });
  }
}

MythixUIModal.register();

export class MythixUIAlertModal extends MythixUIModal {
  static tagName = 'mythix-alert-modal';
}

MythixUIAlertModal.register();

export class MythixUIPromptModal extends MythixUIModal {
  static tagName = 'mythix-prompt-modal';
}

MythixUIPromptModal.register();
