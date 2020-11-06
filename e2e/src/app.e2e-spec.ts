import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be blank', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Start with Ionic UI Components');
  });

  it('function list users with pagination return the number of users correct', () => {
    const page = 0;
    const pageSize = 12;
    const users = listUsers(page, pageSize);

    // test
      const subUser = 'asdgfsdf';
      list-rrhh.edit(subUser);
      expect(page.getUrl()).toContain(subUser);
    //

    expect(users.length <= 12);
  });
});
