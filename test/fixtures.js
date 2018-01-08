//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

/**
 * This file contains mock data for running tests
 */

export const mockDOM = {
  data: [{
    id: 4,
    isDOM: true,
    props: {},
    state: null,
    name: 'div',
    children: [{
      id: 5,
      isDOM: false,
      name: 'Provider',
      props: { store: 'object*', children: 'object*' },
      state: null,
      children: [{
        id: 6,
        isDOM: false,
        props: {},
        state: {},
        name: 'BrowserRouter',
        children: [{
          id: 7,
          isDOM: false,
          name: 'Router',
          props: {},
          state: {},
          children: [{
            id: 8,
            isDOM: true,
            name: 'div',
            props: {},
            state: null,
            children: [
              {
                id: 9,
                isDOM: false,
                name: 'NavBar',
                props: {},
                state: {},
                children: [],
              },
              {
                id: 10,
                isDOM: true,
                name: 'div',
                props: {},
                state: null,
                children: [],
              },
            ],
          }],
        }],
      }],
    }],
  }],
};

export const mockFilterDOM = {
  data: [{
    id: 5,
    isDOM: false,
    name: 'Provider',
    props: { store: 'object*', children: 'object*' },
    state: null,
    children: [{
      id: 6,
      isDOM: false,
      props: {},
      state: {},
      name: 'BrowserRouter',
      children: [{
        id: 7,
        isDOM: false,
        name: 'Router',
        props: {},
        state: {},
        children: [{
          id: 9,
          isDOM: false,
          name: 'NavBar',
          props: {},
          state: {},
          children: [],
        }],
      }],
    }],
  }],
};

export const mockFilterRouter = {
  data: [{
    id: 4,
    isDOM: true,
    props: {},
    state: null,
    name: 'div',
    methods: undefined,
    children: [{
      id: 5,
      isDOM: false,
      name: 'Provider',
      props: { store: 'object*', children: 'object*' },
      state: null,
      children: [{
        id: 8,
        isDOM: true,
        name: 'div',
        props: {},
        state: null,
        children: [
          {
            id: 9,
            isDOM: false,
            name: 'NavBar',
            props: {},
            state: {},
            children: [],
          },
          {
            id: 10,
            isDOM: true,
            name: 'div',
            props: {},
            state: null,
            children: [],
          },
        ],
      }],
    }],
  }],
};

export const mockFilterRedux = {
  data: [{
    id: 4,
    isDOM: true,
    props: {},
    state: null,
    name: 'div',
    methods: undefined,
    children: [{
      id: 6,
      isDOM: false,
      props: {},
      state: {},
      name: 'BrowserRouter',
      methods: undefined,
      children: [{
        id: 7,
        isDOM: false,
        name: 'Router',
        props: {},
        state: {},
        methods: undefined,
        children: [{
          id: 8,
          isDOM: true,
          name: 'div',
          props: {},
          state: null,
          methods: undefined,
          children: [
            {
              id: 9,
              isDOM: false,
              name: 'NavBar',
              props: {},
              state: {},
              methods: undefined,
              children: [],
            },
            {
              id: 10,
              isDOM: true,
              name: 'div',
              props: {},
              state: null,
              methods: undefined,
              children: [],
            },
          ],
        }],
      }],
    }],
  }],
};

/** For store-panel testing */
export const mockReduxStore = {
  prop1: 'hello',
  prop2: ['hello', 'world'],
  prop3: 4,
};

export const mockStorePanel =
  '<ul class="sidebar-nav">' +
    '<li id="store-container">' +
      '<h2>Store</h2>' +
    '<div id="store"></div>' +
      '<br>' +
    '</li>' +
  '</ul>';

export const mockJSONFormatter =
  '<div class="json-formatter-row">' +
    '<a class="json-formatter-toggler-link">' +
      '<span class="json-formatter-toggler">' +
        '</span>' +
          '<span class="json-formatter-value">' +
            '<span>' +
              '<span class="json-formatter-constructor-name">' +
                'Object' +
              '</span>' +
            '</span>' +
          '</span>' +
        '</a>' +
      '<div class="json-formatter-children json-formatter-object">' +
    '</div>' +
  '</div>';


export const mockJSONFormatterExpanded =
  '<div class="json-formatter-row json-formatter-open">' +
    '<a class="json-formatter-toggler-link">' +
      '<span class="json-formatter-toggler"></span>' +
      '<span class="json-formatter-value">' +
        '<span>' +
          '<span class="json-formatter-constructor-name">' +
            'Object' +
          '</span>' +
        '</span>' +
      '</span>' +
    '</a>' +
    '<div class="json-formatter-children json-formatter-object">' +
      '<div class="json-formatter-row">' +
        '<a class="json-formatter-toggler-link">' +
          '<span class="json-formatter-key">' +
            'prop1:' +
          '</span>' +
          '<span class="json-formatter-string">' +
            '"hello"' +
          '</span>' +
        '</a>' +
        '<div class="json-formatter-children json-formatter-empty">' +
        '</div>' +
      '</div>' +
      '<div class="json-formatter-row">' +
        '<a class="json-formatter-toggler-link">' +
          '<span class="json-formatter-toggler"></span>' +
          '<span class="json-formatter-key">' +
            'prop2:' +
          '</span>' +
          '<span class="json-formatter-value">' +
            '<span>' +
              '<span class="json-formatter-constructor-name">' +
                'Array' +
              '</span>' +
              '<span>' +
                '<span class="json-formatter-bracket">' +
                  '[' +
                '</span>' +
                '<span class="json-formatter-number">' +
                  '2' +
                '</span>' +
                '<span class="json-formatter-bracket">' +
                  ']' +
                '</span>' +
              '</span>' +
            '</span>' +
          '</span>' +
        '</a>' +
        '<div class="json-formatter-children json-formatter-object json-formatter-array">' +
        '</div>' +
      '</div>' +
      '<div class="json-formatter-row">' +
        '<a class="json-formatter-toggler-link">' +
          '<span class="json-formatter-key">' +
            'prop3:' +
          '</span>' +
          '<span class="json-formatter-number">' +
            '4' +
          '</span>' +
        '</a>' +
        '<div class="json-formatter-children json-formatter-empty">' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
