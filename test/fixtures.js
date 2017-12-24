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
