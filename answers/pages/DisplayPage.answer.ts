import { Page, Locator } from '@playwright/test';

export class DisplayPage {
  readonly page: Page;

  // トグルの input は CSS で隠れていて visible=false なので、直接は押せない。
  // 囲っている <label> を掴んで setChecked(true/false) で操作する。
  // evaluate(el => el.click()) でも動くが、Playwright のチェックを全部飛ばすため
  // 「押せないはずのときも押せてしまう」。テストとしては使わない。
  readonly darkmodeToggle: Locator;
  readonly compactToggle: Locator;
  readonly coverToggle: Locator;
  readonly ratingToggle: Locator;
  readonly animationToggle: Locator;
  readonly saveButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.darkmodeToggle  = page.locator('label:has([data-testid="display-darkmode"])');
    this.compactToggle   = page.locator('label:has([data-testid="display-compact"])');
    this.coverToggle     = page.locator('label:has([data-testid="display-cover"])');
    this.ratingToggle    = page.locator('label:has([data-testid="display-rating"])');
    this.animationToggle = page.locator('label:has([data-testid="display-animation"])');
    this.saveButton      = page.getByTestId('save-display-btn');
    this.resetButton     = page.getByTestId('reset-display-btn');
  }

  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  // toggle（反転）ではなく setChecked（状態を指定）にすると、実行順に依存しなくなる。
  async setDarkmode(on: boolean) {
    await this.darkmodeToggle.setChecked(on);
  }

  async setCompact(on: boolean) {
    await this.compactToggle.setChecked(on);
  }

  async setCover(on: boolean) {
    await this.coverToggle.setChecked(on);
  }

  async setRating(on: boolean) {
    await this.ratingToggle.setChecked(on);
  }

  async setAnimation(on: boolean) {
    await this.animationToggle.setChecked(on);
  }

  async save() {
    await this.saveButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }
}
