import { MyFirstAppPage } from './app.po';

describe('my-first-app App', () => {
  let page: MyFirstAppPage;

  beforeEach(() => {
    page = new MyFirstAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
