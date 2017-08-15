import { CourseProjectPage } from './app.po';

describe('course-project App', () => {
  let page: CourseProjectPage;

  beforeEach(() => {
    page = new CourseProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
