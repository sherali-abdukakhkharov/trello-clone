**SHOW USER**
----

* **URL**

  /users/:id

* **Method:**
  
  <_The request type_>

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, email: "example@example.com" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND<br />
    **Content:** `{ error : "User doesn't exist" }`

* **Sample Call:**

  <_$.ajax({
    url: "/users/1",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });_>