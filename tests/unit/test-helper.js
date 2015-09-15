import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

export function moduleFor(category, helperName, options = {}) {
  module(`${category} | .${helperName}`, {
    beforeEach: function() {
      if (options.beforeEach) {
        options.beforeEach();
      }
      application = startApp();
    },
    afterEach: function() {
      Ember.run(application, 'destroy');

      // Cleanup DOM
      $('#ember-testing').html('');

      if (options.afterEach) {
        options.afterEach();
      }
    }
  });
}

export function itBehavesLikeAnAttribute(attribute, ...params) {
  it('responds to buildPageObjectAttribute', function(assert) {
    var builder = attribute(...params);

    assert.ok($.isFunction(builder.buildPageObjectAttribute), '`buildPageObjectAttribute` is a function');
  });

  it('returns a builder function', function(assert) {
    var builder = attribute(...params),
        predicate = builder.buildPageObjectAttribute('dummy', {});

    assert.ok($.isFunction(predicate), '`buildPageObjectAttribute()` is a function');
  });
}

export function buildAttribute(attribute, ...params) {
  return attribute(...params).buildPageObjectAttribute('key', {});
}

export function buildAttributeWithOptions(attribute, page, ...params) {
  return attribute(...params).buildPageObjectAttribute('key', page);
}

export function it(description, fn) {
  test(`it ${description}`, fn);
}

export function fixture(str) {
  $('#ember-testing').html(str);
}

export function buildProperty(descriptor, parent = {}) {
  return descriptor.propertyFor(parent, 'key');
}
