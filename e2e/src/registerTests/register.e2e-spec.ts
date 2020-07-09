import { browser, by, element } from 'protractor';
import { URL_APP } from '../../../src/app/config/config';
import {} from 'jasmine';
import { protractor } from 'protractor/built/ptor';

const until = protractor.ExpectedConditions;

describe('Registro', () => {
  beforeEach(() => {
    browser.get(URL_APP + '/register');
  });

  it('Registro incorrecto - email', () => {
        element(by.name('nombre')).sendKeys('Prueba');
        element(by.name('email')).sendKeys('ERROR');
        element(by.name('contraseña')).sendKeys('123');
        element(by.name('contraseña2')).sendKeys('123');
        const buttonTerminos = element(by.name('condiciones')).click();
        const button = element(by.name('submit')).click();

        const el = element(by.css('.swal2-error'));
        browser.wait(until.presenceOf(el), 1500, 'Tarda demasiado en salir el error');
        expect(el.isPresent()).toBeTruthy();
  });

  it('Registro incorrecto - contraseñas distintas', () => {
        element(by.name('nombre')).sendKeys('Prueba');
        element(by.name('email')).sendKeys('prueba@gmail.com');
        element(by.name('contraseña')).sendKeys('123');
        element(by.name('contraseña2')).sendKeys('123456');
        const buttonTerminos = element(by.name('condiciones')).click();
        const button = element(by.name('submit')).click();

        const el = element(by.css('.swal2-error'));
        browser.wait(until.presenceOf(el), 1500, 'Tarda demasiado en salir el error');
        expect(el.isPresent()).toBeTruthy();
  });

  it('Registro incorrecto - no aceptar terminos', () => {
        element(by.name('nombre')).sendKeys('Prueba');
        element(by.name('email')).sendKeys('prueba@gmail.com');
        element(by.name('contraseña')).sendKeys('123');
        element(by.name('contraseña2')).sendKeys('123');
        const button = element(by.name('submit')).click();

        const el = element(by.css('.swal2-error'));
        browser.wait(until.presenceOf(el), 1500, 'Tarda demasiado en salir el error');
        expect(el.isPresent()).toBeTruthy();
  });

  it('Registro correcto', () => {
        element(by.name('nombre')).sendKeys('Prueba');
        element(by.name('email')).sendKeys('prueba@gmail.com');
        element(by.name('contraseña')).sendKeys('123');
        element(by.name('contraseña2')).sendKeys('123');
        const buttonTerminos = element(by.name('condiciones')).click();
        const button = element(by.name('submit')).click();

        expect(browser.getCurrentUrl()).toContain('/login');
  });
});
