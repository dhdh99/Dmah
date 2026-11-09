(() => {
  const defaults = window.DMAH_DEFAULT || {};
  let data = { ...defaults };
  try { const saved = localStorage.getItem('dmah_preview_data'); if (saved) data = { ...data, ...JSON.parse(saved) }; } catch (_) {}
  const form = document.getElementById('editor-form');
  const status = document.getElementById('editor-status');
  const scalarGroups = [
    { title:'첫 화면', fields:[['heroEyebrow','작은 영문 표기'],['heroTitle','첫 화면 제목'],['heroLead','첫 화면 소개'],['heroQuote','인용문'],['heroImageAlt','이미지 대체 설명']] },
    { title:'세계관 소개', fields:[['introEyebrow','작은 영문 표기'],['introTitle','소개 제목'],['introText','소개 문단'],['introNote','강조 문장'],['worldEyebrow','섹션 표기'],['worldTitle','현상 섹션 제목'],['worldIntro','현상 섹션 소개']] },
    { title:'모뉴먼트와 MM', fields:[['monumentEyebrow','모뉴먼트 섹션 표기'],['monumentTitle','모뉴먼트 제목'],['monumentIntro','모뉴먼트 소개'],['organizationTitle','조직 이름'],['organizationLead','조직 소개'],['organizationPublicGoal','공식 명분'],['organizationHiddenGoal','내부 목표'],['organizationNote','강조 메모']] },
    { title:'기록 보관소', fields:[['archiveEyebrow','섹션 표기'],['archiveTitle','기록 제목'],['archiveType','기록 형식'],['archiveText','기록 설명'],['archiveQuote','인용 문구'],['archiveAttribution','기록 출처'],['footerNote','사이트 하단 안내']] }
  ];
  const lists = [
    { key:'worldCards', title:'세계의 현상 카드', fields:[['label','작은 표기'],['title','제목'],['text','설명']] },
    { key:'monuments', title:'모뉴먼트 종류', fields:[['kind','영문 분류'],['name','이름'],['text','설명']] },
    { key:'characters', title:'인물 기록', fields:[['stamp','파일 번호'],['name','이름'],['role','역할'],['text','소개']] },
    { key:'timeline', title:'연표', fields:[['when','시기'],['title','사건 이름'],['text','설명']] }
  ];
  const makeField = (key, label, value, wide=true) => `<div class="editor-field ${wide?'wide':''}"><label for="f-${key}">${label}</label><textarea id="f-${key}" data-key="${key}">${String(value ?? '')}</textarea></div>`;
  scalarGroups.forEach(group => {
    const section = document.createElement('section'); section.className='editor-group';
    section.innerHTML=`<h2>${group.title}</h2><div class="editor-fields">${group.fields.map(([key,label])=>makeField(key,label,data[key],true)).join('')}</div>`;
    form.appendChild(section);
  });
  const imageSection = document.createElement('section'); imageSection.className='editor-group';
  imageSection.innerHTML='<h2>첫 화면 이미지</h2><div class="image-row"><input type="file" id="hero-file" accept="image/*"><span class="image-status" id="image-status">현재 이미지 유지 중</span></div><p class="image-status">이미지를 고르면 웹용 크기로 줄여 사이트 데이터에 담습니다.</p>';
  form.appendChild(imageSection);
  lists.forEach(list => {
    const section = document.createElement('section'); section.className='editor-group';
    section.innerHTML=`<h2>${list.title}</h2><div class="editor-collection" id="collection-${list.key}"></div><button class="add-item" type="button" data-add="${list.key}">＋ 항목 추가</button>`;
    form.appendChild(section);
    const renderItems = () => {
      const holder = section.querySelector(`#collection-${list.key}`); holder.innerHTML='';
      (data[list.key] || []).forEach((item, index) => {
        const card = document.createElement('div'); card.className='editor-item';
        card.innerHTML=`<div class="editor-item-head"><strong>기록 ${String(index+1).padStart(2,'0')}</strong><button type="button" data-remove="${list.key}" data-index="${index}">항목 삭제</button></div><div class="editor-fields">${list.fields.map(([key,label])=>makeField(`${list.key}-${index}-${key}`,label,item[key],true)).join('')}</div>`;
        holder.appendChild(card);
        card.querySelectorAll('textarea').forEach((input, fieldIndex) => {
          const key = list.fields[fieldIndex][0];
          input.addEventListener('input', () => { data[list.key][index][key] = input.value; });
        });
      });
      holder.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => {
        data[list.key].splice(Number(button.dataset.index),1); renderItems();
      }));
    };
    renderItems();
    section.querySelector('[data-add]').addEventListener('click', () => {
      const blank = Object.fromEntries(list.fields.map(([key])=>[key,'']));
      (data[list.key] ||= []).push(blank); renderItems();
      section.querySelector('.editor-item:last-child textarea')?.focus();
    });
  });
  form.querySelectorAll('textarea[data-key]').forEach(input => { if (!input.closest('.editor-item')) input.addEventListener('input', () => { data[input.dataset.key] = input.value; }); });
  document.getElementById('hero-file').addEventListener('change', async (event) => {
    const file = event.target.files?.[0]; if (!file) return;
    try {
      const source = await createImageBitmap(file);
      const scale = Math.min(1, 1920 / source.width);
      const canvas = document.createElement('canvas'); canvas.width=Math.round(source.width*scale); canvas.height=Math.round(source.height*scale);
      canvas.getContext('2d').drawImage(source,0,0,canvas.width,canvas.height);
      data.heroImage = canvas.toDataURL('image/webp',0.84);
      document.getElementById('image-status').textContent = `${file.name} · 미리보기용으로 적용됨`;
      status.textContent='이미지를 선택했습니다. 파일을 내려받아 사이트에 적용하세요.';
    } catch (_) { status.textContent='이 이미지 형식은 열 수 없어요. JPG, PNG 또는 WEBP를 선택해 주세요.'; }
  });
  document.getElementById('save-preview').addEventListener('click', () => {
    try { localStorage.setItem('dmah_preview_data', JSON.stringify(data)); status.textContent='이 브라우저에 저장했습니다. 새 탭에서 미리보기를 엽니다.'; window.open('index.html?preview=1','_blank','noopener'); }
    catch (_) { status.textContent='브라우저 저장이 막혀 있어요. 대신 “업데이트 파일 내려받기”를 사용해 주세요.'; }
  });
  document.getElementById('export-content').addEventListener('click', () => {
    const source = `window.DMAH_DEFAULT = ${JSON.stringify(data,null,2)};\n`;
    const blob = new Blob([source],{type:'text/javascript;charset=utf-8'});
    const link = document.createElement('a'); link.href=URL.createObjectURL(blob); link.download='content.js'; link.click();
    setTimeout(()=>URL.revokeObjectURL(link.href),1000);
    status.textContent='content.js를 내려받았습니다. 기존 파일을 이 파일로 교체하면 업데이트됩니다.';
  });
})();
