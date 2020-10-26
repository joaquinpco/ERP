/**
 *  Custom atributes for AWS Cognito
 */
var params = {
    CustomAttributes: [ /* required */
      {
        AttributeDataType: String,
        DeveloperOnlyAttribute: false,
        Mutable: true,
        Name: 'FIRST_NAME',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '30',
          MinLength: '3'
        }
      },
      {
        AttributeDataType: String,
        DeveloperOnlyAttribute: false,
        Mutable: true,
        Name: 'LAST_NAME',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '30',
          MinLength: '3'
        },
      },
      {
        AttributeDataType: String,
        DeveloperOnlyAttribute: false,
        Mutable: true,
        Name: 'ROLE',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '30',
          MinLength: '3'
        },
      }
      /* more items */
    ],
    UserPoolId: process.env.POOL_ID /* required */
  };

module.exports = params;