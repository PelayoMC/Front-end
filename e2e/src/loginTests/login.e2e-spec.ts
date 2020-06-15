import { browser, by, element } from 'protractor';
import { URL_APP } from '../../../src/app/config/config';
import {} from 'jasmine';
import { protractor } from 'protractor/built/ptor';

const until = protractor.ExpectedConditions;

describe('Login page', () => {
  beforeEach(() => {
    browser.get(URL_APP + '/login');
  });

  it('Login incorrecto - email', () => {
    element(by.name('email')).sendKeys('emailfront1@email.com');
    element(by.name('contraseña')).sendKeys('123');
    const button = element(by.name('submit')).click();

    const el = element(by.css('.swal2-error'));
    browser.wait(until.presenceOf(el), 1500, 'Tarda demasiado en salir el error');
    expect(el.isPresent()).toBeTruthy();
  });

  it('Login incorrecto - contraseña', () => {
    element(by.name('email')).sendKeys('emailfront@email.com');
    element(by.name('contraseña')).sendKeys('1234');
    const button = element(by.name('submit')).click();

    const el = element(by.css('.swal2-error'));
    browser.wait(until.presenceOf(el), 1500, 'Tarda demasiado en salir el error');
    expect(el.isPresent()).toBeTruthy();
  });

  it('Login correcto', () => {
    element(by.name('email')).sendKeys('emailfront@email.com');
    element(by.name('contraseña')).sendKeys('123');
    const button = element(by.name('submit')).click();

    expect(browser.getCurrentUrl()).toContain('/user/');
  });
});
