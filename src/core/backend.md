---
name: API compatible
menu: 0.Core
route: /core/APIcompatible
---

# Đề xuất với backend

## Đề xuất chung
Cấu trúc xung quanh resource, mỗi resource là một list các phần tử được hiển thị trong các bảng. Các phương thức như lấy danh sách, cập nhật, tạo mới, xóa theo chuẩn REST (tương ứng là GET, PUT, POST, DELETE).

Lấy ví dụ với source là contract (phục vụ hiển thị một bảng các thông tin về hợp đồng )

1. Lấy danh sách
	* __endpoint__: ```/contract```
	* __method__: GET
	* __params__: (url encoded)
	```javascript
	{
		filters: {
			// các thuộc tính filter
		},
		page: int,
		perPage: int,
		sort: 'contractId',
		order: ASC|DES
	}
	```
	* __reponse body__:
	```javascript
	{
		items: [contract],
		total: int
	}
	```
2. Lấy detail
	* __endpoint__: ```contract/:id```
	* __method__: GET
	* __response body__:
	```javascript
	{
		id: string // required
		....
	}
	```
3. Sửa
	* __endpoint__: ```contract/:id```
	* __method__: PUT
	* __params__:
	```javascript
	{
		... // các thuộc tính thay đổi và giá trị
	}
	```
	* __response body__:
	```javascript
	{
		id: string // required
		.... // dữ liệu đã được cập nhật
	}
	```
4. Xóa
	* __endpoint__: ```contract/:id```
	* __method__: DELELTE
## Đề xuất về authentication

1. Đề xuất chung
	* Sử dụng Bearer Token, các request của người dùng đã đăng nhập sẽ chưa token Bearer trong header. Sau khi đăng nhập authentication service sẽ trả về accessToken và refreshToken.
	* Đăng nhập theo cặp userName và password

1. Đăng nhập
	* __endpoint__: ```/auth/login```
	* __method__: POST
	* __params__:
	```javascript
	{
		userName: str,
		password: str
	}
	```
	* __response__:
	```javascript
	{
		permissions: [user | admin | accountant ...],
		accessToken: str,
		refreshToken: str
	}
	```
2. Lấy thông tin cá nhân
	* __endpoint__: ```/auth/me```
	* __method__: GET
	* __response__:
	```javascript
	{
		// thông tin cá nhân
	}
	```

## Đề xuất về cấu hình
Api sẽ có service trả lại cho front-end danh sách các giá trị options cho các danh sách lựa chọn, cài đặt cấu hình app, nằm trong một api duy nhất, lấy ví dụ:

1. Example
	* __endpoint__: ```/system/setting```
	* __method__: GET
	* __response__:
	```javascript
	{
		theme: {
			// các giá trị cấu hình giao diện ứng dụng
		},
		selectOptions: {
			packages: [ // options về gói thầu
				{
					name: 'Xây thô'
					...
				},
				{
					name: 'Sơn ngoài'
					...
				}
			],
			capitalTypes: [
				{
					name: 'Vốn vay',
					...
				},
				{
					name: 'Vốn xã hội',
					...
				}
			],
			...
		}
	}
	```
