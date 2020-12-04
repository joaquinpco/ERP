import { AppPage } from './app.po';

describe('New App Launched', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display a page', () => {
    page.navigateTo();
  });

});
