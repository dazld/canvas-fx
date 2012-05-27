<?php

	$start = mt_rand(0,50);

	$json = file_get_contents("http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=anime%20lolitas&start=".$start );
	//var_dump(json_decode($json, true));	
	//$ourarray = json_decode($json, true);
	echo $json;
	//$results = $ourarray["responseData"]["results"];
	
	//echo '<table><tr>';
	//foreach ($results as $v) {
	 //echo '<img src="'.$v["unescapedUrl"].'"/><br />';
	 //echo '<br>';
	//}
	//echo '</tr></table>';

?>

