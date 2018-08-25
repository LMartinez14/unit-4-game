// create sticky header for jumbotron header
// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }

// create the function
$(document).ready(function () {
    // set letiables
    let playerCharacter, oppositeCharacter, characterOptions, characterArray, chooseCharacter, chooseIntruder, numEnemies, attackIncrease, counterAttackPowerDecrease;


    //character letiables/attributes
    function soaArray() {
        playerCharacter;
        oppositeCharacter;

        characterOptions
            = [];
        characterArray = [

            {
                id: 0,
                name: "Jax",
                img: "assets/images/jax.jpg",
                healthPoints: 135,
                attackPower: 14,
                counterAttackPower: 10,

            },

            {
                id: 1,
                name: "Clay",
                img: "assets/images/clay.jpg",
                healthPoints: 120,
                attackPower: 12,
                counterAttackPower: 10,
            },

            {
                id: 2,
                name: "August",
                img: "assets/images/august.jpg",
                healthPoints: 110,
                attackPower: 10,
                counterAttackPower: 10,
            },

            {
                id: 3,
                name: "Tig",
                img: "assets/images/tig.jpg",
                healthPoints: 90,
                attackPower: 8,
                counterAttackPower: 10,
            },

            {
                id: 4,
                name: "Gemma",
                img: "assets/images/gemma.jpg",
                healthPoints: 90,
                attackPower: 9,
                counterAttackPower: 10,
            },


        ];

        // start the game at "false."
        // array of length 4
        //increase player attack by 5pts each turn
        chooseCharacter = false;
        chooseIntruder = false;
        numEnemies = 4;
        attackIncrease = 5;
        counterAttackPowerDecrease = 3;

        //character array

        for (let i = 0; i < characterArray.length; i++) {
            characterOptions
                += "<div id=" + characterArray[i].id + " class='btn character text-center' value=" + characterArray[i].id +
                "><img class='soaCharacters' src=" + characterArray[i].img + " alt=" + characterArray[i].name + "><br> HP: " + characterArray[i].healthPoints +
                "<br> AP: " + characterArray[i].attackPower + " </div>";
        }

        //create global functions
        $("#chooseYourCharacter").html(characterOptions
        );
        $("#action").html("Who is your man on the inside?");

        $('.mainCharacter').remove();
        $('.fighting').remove();
        $('#actionConsequence').html(" ");

        attachCharacterOnClick();
    }

    function printCharacters() {
        let mainCharacter = "<div id=" + characterArray[playerCharacter].id + " class='btn character text-center mainCharacter' value=" + characterArray[playerCharacter].id +
            "><img class='soaCharacters' src=" + characterArray[playerCharacter].img + " alt=" + characterArray[playerCharacter].name +
            "><br> Health: " + characterArray[playerCharacter].healthPoints +
            "<br> Attack: " + characterArray[playerCharacter].attackPower + " </div>";

        let tmIntruder = "<div id=" + characterArray[oppositeCharacter].id + " class='btn character text-center fighting' value=" + characterArray[oppositeCharacter].id +
            "><img class='soaCharacters' src=" + characterArray[oppositeCharacter].img + " alt=" + characterArray[oppositeCharacter].name +
            "><br> Health: " + characterArray[oppositeCharacter].healthPoints +
            "<br> Attack: " + characterArray[oppositeCharacter].attackPower + " </div>";
        $('#chosenCharacter').html(mainCharacter);
        $('#enemy').html(tmIntruder);
    }

    function actionConsequence() {
        let description = "You attack " + characterArray[oppositeCharacter].name + " for " + characterArray[playerCharacter].attackPower + " damage!<br>" +
            characterArray[oppositeCharacter].name + " fires back for " + characterArray[oppositeCharacter].counterAttackPower +  " damage!<br>" +
            "You found more ammo! " + attackIncrease + "!";
        $('#actionConsequence').html(description);
    }

    function attachCharacterOnClick() {
        $('.character').on("click", function () {
            if (!chooseCharacter) {	//chooseYourCharacter your character
                playerCharacter = $(this).attr('id');
                $("#chosenCharacter").append(this);
                $(this).addClass("mainCharacter");

                chooseCharacter = true;
                $('#actionConsequence').html("");
                $("#action").html("Who to fight now?");
            }
            //You have a character and you're chooseYourCharacter your opponent
            else if (!chooseIntruder && chooseCharacter && playerCharacter !== $(this).attr('id')) {
                oppositeCharacter = $(this).attr('id');
                $("#enemy").append(this);
                $(this).addClass("fighting");

                chooseIntruder = true;
                $('#actionConsequence').html("");
                $("#action").html("Members UNITE!");
            }
        });
    }

    $('#attack').on("click", function () {
        if (!chooseCharacter) {
            $('#actionConsequence').html("Who has your back?"); // if player has not chosen a character
        }
        else if (!chooseIntruder) {
            $('#actionConsequence').html("Stop randomly shooting at nothing!"); // if there is no enemy on the field
        }
        else if (chooseCharacter && chooseIntruder) {
            attackIncrease++;
            characterArray[playerCharacter].healthPoints = characterArray[playerCharacter].healthPoints - characterArray[oppositeCharacter].counterAttackPower;	// character hp =character - opposite counter attack
            characterArray[oppositeCharacter].healthPoints = characterArray[oppositeCharacter].healthPoints - characterArray[playerCharacter].attackPower;	// opposite character hp = opposite - character attack ++


            if (characterArray[oppositeCharacter].healthPoints <= 0) {
                numEnemies--;
                if (numEnemies > 0) {
                    $(".fighting").remove();
                    $('#actionConsequence').html(" ");
                    $("#action").html("Who's coming for you?");
                    chooseIntruder = false; //reset enemy field
                }
                // win
                else {
                    actionConsequence();
                    alert("You've defended Teller-Morrow... for now.");
                    soaArray
                        ();
                }

            }
            // lose
            else if (characterArray[playerCharacter].healthPoints < 0) {
                actionConsequence();
                alert("You're dead!!");
                soaArray
                    ();
            }
            else {
                actionConsequence();
                printCharacters();
            }

            characterArray[playerCharacter].attackPower = characterArray[playerCharacter].attackPower + attackIncrease;	// increase attack points



            characterArray[oppositeCharacter].attackPower = characterArray[oppositeCharacter].counterAttackPower + counterAttackPowerDecrease;	// decrease counter attack points
        }
    });

    // reset the field
    $('#restart').on("click", function () {
        soaArray
            ();
    });

    attachCharacterOnClick();
    soaArray();

}
);