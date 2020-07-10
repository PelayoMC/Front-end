import { browser, by, element } from 'protractor';
import { URL_APP } from '../../../src/app/config/config';
import {} from 'jasmine';
import { protractor } from 'protractor/built/ptor';

const until = protractor.ExpectedConditions;

describe('Reset', () => {

  it('Solicitar reset incorrecto - email', () => {
      browser.get(URL_APP + '/login');
      element(by.name('email')).sendKeys('ERROR');
      const button = element(by.name('reset')).click();

      const el = element(by.css('.swal2-error'));
      browser.wait(until.presenceOf(el), 1500, 'Tarda demasiado en salir el error');
      expect(el.isPresent()).toBeTruthy();
  });

  it('Reset incorrecto - contraseñas distintas', () => {
      browser.get(URL_APP + '/reset');
      element(by.name('contraseña')).sendKeys('1234');
      element(by.name('contraseña2')).sendKeys('123456');
      const button = element(by.name('submit')).click();

      const el = element(by.css('.swal2-error'));
      browser.wait(until.presenceOf(el), 1500, 'Tarda demasiado en salir el error');
      expect(el.isPresent()).toBeTruthy();
  });

  it('Reset correcto', () => {
      browser.get(URL_APP + '/reset');
      element(by.name('email')).sendKeys('emailfront@email.com');
      element(by.name('contraseña')).sendKeys('123');
      const button = element(by.name('submit')).click();

      expect(browser.getCurrentUrl()).toContain('/user/');
  });
});
