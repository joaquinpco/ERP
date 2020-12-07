/**
 *  Custom atributes for AWS Cognito
 */
var params = {
    CustomAttributes: [ /* required */
      {
        AttributeDataType: 'String',
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
        AttributeDataType: 'String',
        DeveloperOnlyAttribute: false,
        Mutable: true,
        Name: 'LAST_NAME',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '30',
          MinLength: '3'
        }
      },
      {
        AttributeDataType: 'String',
        DeveloperOnlyAttribute: false,
        Mutable: true,
        Name: 'ROLE',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '30',
          MinLength: '3'
        }
      },
      {
        AttributeDataType: 'String',
        DeveloperOnlyAttribute: false,
        Mutable:true,
        Name: 'NIF',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '9',
          MinLength: '9'
        }
      },
      {
        AttributeDataType: 'Number',
        DeveloperOnlyAttribute:false,
        Mutable:true,
        Name: 'PHONE',
        Required: false,
        NumberAttributeConstraints: {
          MaxValue: '15',
          MinValue: '4'
        }
      },
      {
        AttributeDataType: 'String',
        DeveloperOnlyAttribute:false,
        Mutable:true,
        Name: 'ADDRESS',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '255',
          MinLength: '1'
        }
      },
      {
        AttributeDataType: 'Number',
        DeveloperOnlyAttribute:false,
        Mutable:true,
        Name: 'NSS',
        Required: false,
        NumberAttributeConstraints: {
          MaxValue: '8',
          MinValue: '6'
        }
      },
      {
        AttributeDataType: 'String',
        DeveloperOnlyAttribute:false,
        Mutable:true,
        Name: 'STR_PHONE',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '16',
          MinLength: '4'
        }
      },
      {
        AttributeDataType: 'String',
        DeveloperOnlyAttribute:false,
        Mutable:true,
        Name: 'STRG_NSS',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '12',
          MinLength: '1'
        }
      },
      {
        AttributeDataType: 'String',
        DeveloperOnlyAttribute: false,
        Mutable: true,
        Name: 'PROFILE_PICTURE',
        Required: false,
        StringAttributeConstraints: {
          MaxLength: '500',
          MinLength: '3'
        }
      }
      /* more items */
    ],
    UserPoolId: process.env.POOL_ID /* required */
  };

module.exports = params;