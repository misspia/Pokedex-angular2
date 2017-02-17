import { PokedexAngular2Page } from './app.po';

describe('pokedex-angular2 App', () => {
  let page: PokedexAngular2Page;

  beforeEach(() => {
    page = new PokedexAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
