---
name: Tutorial
menu: 0.Core
---

## Khởi động

Sunshine Inside Pro sử dụng umi kết hợp dva và kết hợp thư viện xây dựng giao diện admin dashboard là Ant Pro phiên bẳn 4.0 sử dụng typescript viết static type code.

```bash
yarn
yarn start
```

## Sử dụng Data Provider để giao tiếp với API

Sunshine Pro sử dụng một cơ chế adapter để lựa chọn cách giao tiếp với API (theo tùy từng dạng API như REST, GraphQL, Odata, Database vv ), sunshine pro chỉ quan tâm đến một hàm gọi là data provider để giao tiếp với API, công việc của dev là viết các hàm, module giao tiếp với các api đồng nhất với signature của data provider: 

```javascript
/**
 * Query a data provider and return a promise for a response
 *
 * @example
 * dataProvider(GET_ONE, 'posts', { id: 123 })
 *  => Promise.resolve({ data: { id: 123, title: "hello, world" } })
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the action type
 * @returns {Promise} the Promise for a response
 */
const dataProvider = (type, resource, params) => new Promise();
```

## Ánh xạ API endpoint với các nguồn dữ liệu (resource)

Giả dụ ta muốn xây dựng một bảng danh sách các hợp đồng, vậy ta cần nguồn dữ liệu về hợp đồng được lấy từ api, và lưu trong state của ứng dụng.

Bên Backend API thống nhất sử dụng định danh của resource này là __contract__ và có các endpoint sau, cùng với format gửi (request) trả (response) để thao tác với dữ liệu của contract:

| Request Type | API calls                                                    |
| ------------ | ------------------------------------------------------------ |
| GET LIST     | GET http://my.api.url/contract?sort=['title','ASC']&range=[0, 24]&filter={title:'bar'} |
| GET ONE      | GET http://my.api.url/contract/123                           |
| CREATE       | POST http://my.api.url/contract/123                          |
| UPDATE       | PUT http://my.api.url/contract/123                           |

Nhờ sự thống nhất này mà chúng ta chỉ cần dựa vào định danh của resource mà có thể suy ra tất cả các logic của việc lấy danh sách, cập nhật, tạo mới của một nguồn dữ liệu. Và tạo ra các thành phần Controller để thực thi logic của các nhiệm vụ này: 

- __List Controller__: Quản lý việc cập nhật trạng thái bộ lọc, thông số sắp xếp (sorter), phân trang và lấy dữ liệu từ api mỗi khi các các trạng thái trên được cập nhật.
- __Edit Controller__ : Quản lý việc update một phần tử trong nguồn dữ liệu
- __Create Controller__: Quản lý việc tạo mới một phần tử trong nguồn dữ liệu 

### Lưu thông tin về resource trong redux store

Thông tin của mỗi nguồn dữ liệu sẽ được lưu trong redux store trong state ```resources``` dưới dạng như sau, lấy ví dụ với thông tin của nguồn dữ liệu contract (hợp đồng).

```javascript
resources: {
	props: {
        resources: "contract",
    },
    data: {} // dữ liệu danh sách các contract, mỗi contract là một object được map thành các thuộc tính có key mang giá trị là id của contract đó.
    list: {
        ids: [], // thứ tự của các records theo sắp xếp
        params: {}, // giá trị filter, thông số sorter, pagination của dữ liệu được đặt ở đây
        selectedIds: [], // danh sách các id tương ứng với các contract được lựa chọn trên bảng
        
    }
}
```

Để tạo một ```resource``` trong ```redux store```ta sẽ sử dụng ```Resource``` component:

```jsx
<Resource resource="contract"/>
```

Thành phần ```Resource``` sẽ phải được mount trước tất cả các thành phần khác nếu muốn sử dụng thông tin của nguồn dữ liệu ```contract``` ở trong  ```redux store```.

### Luồng cập nhật dữ liệu 

![Data flow](https://i.imgur.com/hDUgXfi.png)

https://i.imgur.com/hDUgXfi.png

Sử dụng ```ListController``` để quản lý việc update bộ lọc, sắp xếp, và chuyển trang (pagination), và update dữ liệu theo giá trị của các tham số đó.

Như vậy để tạo một bảng danh sách hiển thị nguồn dữ liệu ```contract``` ta cần sử dụng ```ListController``` 

```jsx
<ListController resource="contract" />
```

Sau khi mount ``ListController``  một luồng cập cập nhật dữ liệu của nguồn dữ liệu ```contract``` được khởi tạo.



Khi đó ```ListController``` tạo ra những thông tin cần thiết để liệt kê danh sách các ```contract```, cập nhật, xóa, sửa, xem chi tiết một ```contract```, và truyền các thông tin này bằng một cơ chế trong ```React JS``` gọi là ```React Context```.

### Sử dụng ListView để tạo layout cho bảng danh sách, công cụ filter

``ListView`` sẽ sử dụng các thông tin cần thiết mà ``ListController`` tạo ra để cung cấp dữ liệu cho bảng và chức năng của thành phần ```Filter``` đồng thời sắp xếp chúng lên màn hình. Các ```actions``` và ```filter``` sẽ được truyền vào ```ListView``` dưới dạng thuộc tính, còn thành phần bảng sẽ được truyền giống như thành phần con của ```ListView```. Ngoài ra nếu truyền nhiều thành phần con cho ```ListView```, thì một dạng giao diện kiểu chuyển tab sẽ được sử dụng với mỗi tab tương ứng với mỗi thành phần con.

```jsx
<ListView 
	actions={ReactNode}
    filter={ReactNode}
>
 	<Datagird columns=[]columMeta tableOptions={...} />
</ListView>
```

```ListView``` có nhiệm vụ sắp xếp layout trên màn hình dành cho các thành phần UI của bộ lọc, thanh hoạt động, các tabs, tuy nhiên việc sử dụng những hàm tính năng hay dữ liệu lấy từ ```ListController``` sẽ do các actions, filter và ```Datagrid``` quyết định.