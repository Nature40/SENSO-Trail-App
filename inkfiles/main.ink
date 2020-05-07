# station:Moskau 55.755826 37.6173 asdsadasd
# station:Berlin 52.520007 13.404954 asas
# author: Nimo
# title: Test
INCLUDE moskau
INCLUDE berlin
INCLUDE utils


Hallo mein Name ist SENSI. 
bla bla bla
-> Main

=== Main ===
Wie kann ich dir behilflich sein?
+ Wer bist du? 
-> about
+ Wo bin ich? 
-> Map
+ Mach mal einen Test 
-> Test

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

+ genug getestet!
-> Main

=== testAudio ===
#audio: test.mp3
Dies ist ein toller Test mit einem Audio File
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