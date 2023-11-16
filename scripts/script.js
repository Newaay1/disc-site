const udf = 'ud.json';

document.addEventListener('DOMContentLoaded', () => {
  fetchUserData(udf);
});

function fetchUserData(udf) {
  fetch(udf)
    .then(response => response.json())
    .then(data => {
      const uids = data.uds;
      const circleContainer = document.querySelector('.circle-container');

      uids.forEach((uid, index) => {
        const userLink = `https://discord.com/users/${uid}/`;
        const circle = createCircle(index, userLink);
        circleContainer.appendChild(circle);

        setTimeout(() => {
          fetchUserDetails(uid, index);
        }, 1000 * index);
      });


    })
    .catch(error => console.error(error));
}

function fetchUserDetails(uid, index) {
  fetch(`https://rhx.cl/users/${uid}/`)
    .then(response => response.json())
    .then(userData => {
      updateCircleWithData(index, userData);
    })
    .catch(error => console.error(error));
}

function updateCircleWithData(index, userData) {
  const flags = {
    ActiveDeveloper: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/activedeveloper.svg' alt='Active Developer' title='Desenvolvedor Ativo'>",
    PremiumEarlySupporter: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/pig.svg' alt='Premium Early Supporter' title='Apoiador Inicial'>",
    HypeSquadOnlineHouse1: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/hypebravery.svg' alt='HypeSquad Online House 1' title='Bravery'>",
    HypeSquadOnlineHouse2: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/hypebrilliance.svg' alt='HypeSquad Online House 2' title='Brilliance'>",
    HypeSquadOnlineHouse3: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/hypebalance.svg' alt='HypeSquad Online House 3' title='Balance'>",
    Nitro: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/nitro.svg' alt='Nitro' title='Nitro'>",
    BoostLevel1: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/lvl1.svg' alt='Boost Level 1' title='Boost Nível 1 (1 mês)'>",
    BoostLevel2: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/lvl2.svg' alt='Boost Level 2' title='Boost Nível 2 (2 meses)'>",
    BoostLevel3: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/lvl3.svg' alt='Boost Level 3' title='Boost Nível 3 (3 meses)'>",
    BoostLevel4: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/lvl4.svg' alt='Boost Level 4' title='Boost Nível 4 (6 meses)'>",
    BoostLevel5: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/lvl5.svg' alt='Boost Level 5' title='Boost Nível 5 (9 meses)'>",
    BoostLevel6: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/lvl6.svg' alt='Boost Level 6' title='Boost Nível 6 (12 meses)'>",
    BoostLevel7: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/lvl7.svg' alt='Boost Level 7' title='Boost Nível 7 (15 meses)'>",
    BoostLevel8: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/lvl8.svg' alt='Boost Level 8' title='Boost Nível 8 (18 meses)'>",
    BoostLevel9: "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/lvl9.svg' alt='Boost Level 9' title='Boost Nível 9 (24 meses)'>",
    LegacyUsername: `<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/pomelo.svg' alt='Legacy Username Badge' title='Originalmente ${userData.user.legacyUsername}'>`,
    BotCommands: `<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/botcommands.svg' alt='Bot Commands Badge' title='Compatível com Comandos'>`,
    automod: `<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/automod.svg' alt='AutoMod Badge' title='Usa AutoMod'>`,

  }

  const imgElement = document.getElementById(`avatar${index + 1}`);
  const nameElement = document.getElementById(`name${index + 1}`);
  const tagElement = document.createElement('p');
  tagElement.className = 'tag';
  tagElement.textContent = `@${userData.user.tag}`;
  const flagsElement = document.getElementById(`flags${index + 1}`);

  imgElement.src = userData.profile.avatarUrl;
  nameElement.textContent = userData.user.globalName || userData.user.username || 'Nome não disponível';
  flagsElement.innerHTML = (userData.profile.badgesArray && userData.profile.badgesArray.length > 0)
    ? userData.profile.badgesArray.map((flag) => flags[flag] || '').join(' ')
    : `<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/DiscordBadges_rhx/main/badges/invis.png' alt='Sem badges' title='Sem badges'>`;

  nameElement.appendChild(tagElement);

  imgElement.addEventListener('load', () => {
    const circleElement = document.querySelector(`.circle:nth-child(${index + 1}`);
    circleElement.classList.add('loaded');
  });
}
function createCircle(index, userLink) {
  const circle = document.createElement('div');
  circle.className = 'circle';

  const link = document.createElement('a');
  link.href = userLink || `https://discord.com/users/${index + 1}`;
  link.target = "_blank";
  link.title = `Clique para ir para o perfil.`;

  const avatar = document.createElement('img');
  avatar.id = `avatar${index + 1}`;
  avatar.alt = '';

  const nameContainer = document.createElement('div');
  nameContainer.className = 'name-container';

  const nameParagraph = document.createElement('p');
  nameParagraph.id = `name${index + 1}`;
  nameParagraph.textContent = 'Nome não disponível';

  const flagsParagraph = document.createElement('p');
  flagsParagraph.id = `flags${index + 1}`;
  flagsParagraph.innerHTML = 'Nenhuma badge disponível';

  link.appendChild(avatar);
  nameContainer.appendChild(nameParagraph);
  nameContainer.appendChild(flagsParagraph);
  circle.appendChild(link);
  circle.appendChild(nameContainer);

  return circle;
}

function removeOverlay() {
  var overlay = document.querySelector('.black-overlay');
  playMusic();
  overlay.style.transition = 'opacity 1s';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);
}


function playMusic() {
  const audio = document.getElementById('audio');
  audio.play();
}

function getKey(e) {
  var n = e.keyCode;
  if (console.log(n), 16 != n && 17 != n || (mode = 2), 1 == mode) {
    if (123 == n)
      return !1
  } else {
    if (73 == n || 74 == n || 85 == n)
      return !1;
    if (123 == n)
      return !1
  }
}

let mode = 1;
document.oncontextmenu = new Function("return false;");
window.onkeydown = getKey;

document.querySelector('.circle-container').onmousemove = e => {
  for (const circle of document.querySelectorAll('.circle')) {
    const rect = circle.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circle.style.setProperty('--mouse-x', `${x}px`);
    circle.style.setProperty('--mouse-y', `${y}px`);
  }
};
