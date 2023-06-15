const {
    addUserToList,
    createUser,
  } = require('../lib/mailchimp');
  
  jest.mock('@mailchimp/mailchimp_marketing', () => {
    const addListMember = jest.fn();
    const setConfig = jest.fn();
  
    return {
      lists: {
        addListMember,
      },
      setConfig,
    };
  });
  
  describe('addUserToList', () => {
    it('should add a user to the cohort and course lists', async () => {
      const mailchimp = require('@mailchimp/mailchimp_marketing');
      const emailData = {
        user_email: 'test@example.com',
        params: {
          cohort: 'cohort-list-id',
          course: 'course-list-id',
        },
      };
  
      await addUserToList(emailData);
  
      expect(
        mailchimp.lists.addListMember
      ).toHaveBeenCalledTimes(2);
      expect(
        mailchimp.lists.addListMember
      ).toHaveBeenCalledWith('cohort-list-id', {
        email_address: 'test@example.com',
        status: 'subscribed',
      });
      expect(
        mailchimp.lists.addListMember
      ).toHaveBeenCalledWith('course-list-id', {
        email_address: 'test@example.com',
        status: 'subscribed',
      });
    });
  });
  
  describe('createUser', () => {
    const mailchimp = require('@mailchimp/mailchimp_marketing');
    it('should create a user and call addListMember with correct parameters', async () => {
      const user = {
        email: 'test@gmail.com',
        first_name: 'Test',
        last_name: 'User',
        bio: 'I am a test user',
      };
  
      await createUser(user);
  
      expect(mailchimp.lists.addListMember).toHaveBeenCalledTimes(3);
      expect(mailchimp.lists.addListMember).toHaveBeenCalledWith('b578d43584', {
        email_address: 'test@gmail.com',
        status: 'subscribed',
        merge_fields: {
          EMAIL: 'test@gmail.com',
          FIRST_NAME: 'Test',
          LAST_NAME: 'User',
          BIO: 'I am a test user',
        },
      });
    });

    it('should create a user and call addListMember with correct parameters - if empty value in object, dont show in merge fields', async () => {
        const user = {
          email: 'test@gmail.com',
          first_name: 'Test',
          last_name: 'User',
          bio: '',
        };
    
        await createUser(user);
    
        expect(mailchimp.lists.addListMember).toHaveBeenCalledTimes(4);
        expect(mailchimp.lists.addListMember).toHaveBeenCalledWith('b578d43584', {
          email_address: 'test@gmail.com',
          status: 'subscribed',
          merge_fields: {
            EMAIL: 'test@gmail.com',
            FIRST_NAME: 'Test',
            LAST_NAME: 'User',
          },
        });
      });
  });