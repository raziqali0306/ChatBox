import {PagedContacts} from 'react-native-paged-contacts';
import {PermissionsAndroid} from 'react-native';

const page_size = 30;
class Contacts {
  hasPermissions = false;
  totalContactCount = 0;
  totalPages = 0;
  pagedContacts = new PagedContacts();

  async getPermissions() {
    const granted = await PermissionsAndroid.request(
      'android.permission.READ_CONTACTS',
    );
    if (granted === 'granted') {
      this.hasPermissions = true;
      this.pagedContacts.getContactsCount().then((count: number) => {
        this.totalContactCount = count;
        this.totalPages = this.totalContactCount / page_size + 1;
      });
    }
  }

  async getContacts(pageNumber: number): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      if (this.hasPermissions) {
        this.pagedContacts
          .getContactsWithRange(pageNumber * page_size, page_size, [
            PagedContacts.displayName,
            PagedContacts.thumbnailImageData,
            PagedContacts.phoneNumbers,
            PagedContacts.emailAddresses,
          ])
          .then((contacts: any) => {
            resolve(contacts);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        this.getPermissions();
        resolve([]);
        // do stuff
      }
    });
  }
}

const contacts = new Contacts();

export default contacts;
