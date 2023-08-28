# Post_Office_Application

Deployed Link : https://pritimunde1999.github.io/Post_Office_Application/

1.Get user's IP Address using js scripts.

2.Once done, hit an api request at https://ipinfo.io/${IP}/geo , where ${IP} will be the IP of the user.

3.Get the IP Address on the load of the page, where as get the information from the API on the click of the button.

4.Using the lat,long given in the location of the json which you'll get in point 3, showed the user's location on google map.

5.Using the timezone given from the json in point 3 get the time of the user's location.

6.From the pincode in the json, send a get req to another API https://api.postalpincode.in/pincode/${pincode}.

7.This gave you a list of post offices in that pincode. Mapped and showed all the post offices available in that area.

8.Also created a search box and filter the postal offices by name and branch office.
