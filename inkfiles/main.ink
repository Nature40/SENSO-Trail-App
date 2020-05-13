INCLUDE data.ink
INCLUDE moskau.ink
INCLUDE berlin.ink



Hallo mein Name ist SENSI. 
-> Main

=== Main ===
Wie kann ich dir behilflich sein?
+ Wer bist du? 
-> about
+ Wo bin ich? 
-> Map
+ Mach mal einen Test 
-> Test
+ Zur station Berlion
-> PanoramaStationBerlin

=== PanoramaStationBerlin ===
LINK: https:\/\/panorama.de/asasfaf2
-> Berlin

=== Test ===
Hier sind verschiedenen Tests.
+ Teste viele Antworten
-> testAnswerOverload
+ Teste lange Antwort
-> testLongAnswer
+ Teste viele Zeilenumbrüche
-> testLineOverload
+ Test audio
-> testAudio
+ Test Bild
-> testBild

+ genug getestet!
-> Main

=== testAudio ===
Dies ist ein toller Test mit einem Audio File #audio: test.mp3
-> Test

=== testBild ===
Dies ist ein toller Test mit einem Bild #image: test.jpg
-> Test

=== testLineOverload ===
Teste:
Zeile 1
Zeile 2
Zeile 3
Zeile 4
Zeile 5
Zeile 6
Zeile 7
Zeile 8
Zeile 9
Zeile 10
+ fertig!
-> Test

=== testLongAnswer ===
Teste:
+ das hier ist einen recht lange antwort. mal schauen wie sich das ganze darstellt.
-> Test

=== testAnswerOverload ===
Teste:
+ Test Antwort 
-> Test
+ Test Antwort 
-> Test
+ Test Antwort 
-> Test
+ Test Antwort 
-> Test
+ Test Antwort 
-> Test
+ Test Antwort 
-> Test
+ Test Antwort 
-> Test

=== Map ===
Auf der Karte kannst du sehen wo du dich gerade befindest
Hier ist dann ne Karte oder ein link
+ Okay vielen Dank 
-> Main


=== about ===

Ich bin SENSI. Dein Virtueller Begleiter. 
Bla bla bla
+ Hallo SENSI. 
-> Main
//Replace this comment with Ink and start writing!

//Replace this comment with Ink and start writing!
