import { browser, by, element } from 'protractor';
import { URL_APP } from '../../../src/app/config/config';
import {} from 'jasmine';

describe('Login page', () => {
  it('Login incorrecto', () => {
    browser.get(URL_APP + '/login');
    element(by.name('email')).sendKeys('emailfront@email.com');
    element(by.name('contraseña')).sendKeys('1234');
    const button = element(by.name('submit')).click();
    browser.driver.wait(() => {
      console.log(element(by.id('swal2-title')).getAttribute('value'));
      expect(element(by.id('swal2-title')).getAttribute('value')).toContain('error');
    }, 1000);
  });
});
