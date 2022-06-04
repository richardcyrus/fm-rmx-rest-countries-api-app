module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order'],
  rules: {
    'comment-empty-line-before': [
      'always',
      {
        ignoreComments: ['/^#endregion/'],
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { ignoreShorthands: ['/flex/', '/grid/'] },
    ],
    'font-family-name-quotes': 'always-where-required',
    'number-max-precision': 6,
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': null,
  },
};
