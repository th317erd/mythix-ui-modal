import { MythixUIComponent } from 'mythix-ui-core';

export class MythixUIModal extends MythixUIComponent {
  static tagName = 'mythix-modal';

  get $dialog() {
    return this.$('dialog').first()[0];
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

  returnValue = null;

  publishContext() {
    return {};
  }

  onHeaderCaptionSlotChange() {
  }

  onHeaderButtonClick(event) {
    if (!event.defaultPrevented)
      this.close();
  }

  onHeaderButtonsSlotChange() {
    this.$('button')
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
    this.$('button')
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
    if (this.open)
      this.show();

    this.$dialog.addEventListener('click', (event) => {
      if (this.isAttributeTruthy('autoclose') && event.target === this.$dialog)
        this.close(null);
    });
  }
}

MythixUIModal.register();

export class MythixUIAlertModal extends MythixUIComponent {
  static tagName = 'mythix-alert-modal';
}

MythixUIAlertModal.register();
