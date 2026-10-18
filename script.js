const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); menu.textContent = open ? 'Close −' : 'Menu +'; });
navigation?.addEventListener('click', event => { if (event.target.closest('a') && menu.getAttribute('aria-expanded') === 'true') menu.click(); });
document.addEventListener('keydown', event => {if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {menu.click(); menu.focus();}});
const ideas = {
 cafe: {image:'assets/coffee.jpg',alt:'Fresh coffee being prepared',kicker:'FROM QUICK STOP TO DAILY RITUAL',title:'Their morning starts with you.',description:'Bring your atmosphere online. Put the menu, hours, and directions one tap away, then give the neighborhood a reason to try something new.',action:'A seasonal drink spotlight with a clear “find us” link.',business:'Coffee shop'},
 salon: {image:'assets/salon.jpg',alt:'A bright salon with styling stations',kicker:'FROM LOOKING TO BOOKING',title:'Make a great first impression.',description:'Let your work speak before someone walks through the door. A clear service menu, a feel for your space, and an easy path to booking can make choosing you feel natural.',action:'A signature-service page that leads straight to your booking tool.',business:'Salon or studio'},
 shop: {image:'assets/cafe.jpg',alt:'An inviting local business interior',kicker:'FROM PASSING BY TO POPPING IN',title:'Give them a reason to stop.',description:'Show people what makes your business worth the trip. Tell the story behind your work, put useful details up front, and make each new arrival or offer easy to discover.',action:'A neighborhood introduction with a featured product or service.',business:'Shop or local service'}
};
document.querySelectorAll('[data-idea]').forEach(button => button.addEventListener('click', () => {
 const data=ideas[button.dataset.idea];
 document.querySelectorAll('[data-idea]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
 document.querySelector('#idea-image').src=data.image; document.querySelector('#idea-image').alt=data.alt;
 for (const key of ['kicker','title','description','action']) document.querySelector('#idea-'+key).textContent=data[key];
 document.querySelector('#idea-link').href='demo.html?business='+encodeURIComponent(data.business);
}));
const form=document.querySelector('#project-form');
if(form){
 let step=0; let brief=''; const steps=[...document.querySelectorAll('.form-step')];
 const captions=['YOUR BUSINESS','YOUR NEXT CHAPTER','YOUR DETAILS'];
 const type=new URLSearchParams(location.search).get('business'); if(type) form.elements.businessType.value=type;
 function showStep(index){step=index;steps.forEach((section,i)=>{section.hidden=i!==step; section.querySelectorAll('input,select,textarea').forEach(field=>field.disabled=i!==step);});document.querySelector('#step-caption').textContent=`0${step+1} / ${captions[step]}`;document.querySelector('#step-count').textContent=`${step+1} of 3`;document.querySelector('#progress-fill').style.width=`${(step+1)/3*100}%`;document.querySelector('#back-step').hidden=step===0;document.querySelector('#next-step').hidden=step===2;document.querySelector('#finish').hidden=step!==2;document.querySelector('#brief-summary').textContent=`${form.elements.business.value} · ${form.elements.town.value} — ${form.elements.goal.value}`;}
 function validStep(){for(const field of steps[step].querySelectorAll('input,textarea,select')) if(!field.reportValidity())return false; return true;}
 document.querySelector('#next-step').addEventListener('click',()=>{if(validStep()){showStep(step+1);steps[step].querySelector('input,textarea,select').focus();}});
 document.querySelector('#back-step').addEventListener('click',()=>{showStep(step-1);steps[step].querySelector('input,textarea,select').focus();});
 form.addEventListener('submit',event=>{event.preventDefault();if(step<2){document.querySelector('#next-step').click();return;}if(!validStep())return;
 const labels={business:'Business',businessType:'Business type',town:'Location',website:'Website',goal:'Main goal',audience:'Ideal customers',notes:'Notes',budget:'Budget',name:'Your name',email:'Email'};
 brief='NEARWELL — YOUR PROJECT BRIEF\n\n'+Object.entries(labels).map(([key,label])=>`${label}: ${form.elements[key].value.trim()||'Not specified'}`).join('\n\n')+'\n\nCreated in the NearWell preview. This brief has not been sent.\n';
 form.hidden=true;document.querySelector('#complete').hidden=false;document.querySelector('#download-brief').focus();
 });
 document.querySelector('#download-brief').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='nearwell-project-brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 document.querySelector('#edit-brief').addEventListener('click',()=>{document.querySelector('#complete').hidden=true;form.hidden=false;showStep(0);form.elements.business.focus();});
 showStep(0);
}
if (form) {
 const goalPresets={website:'A new or better website',local:'Reaching more local customers',ideas:'Content and campaign ideas'};
 const selectedGoal=goalPresets[new URLSearchParams(location.search).get('goal')];
 if(selectedGoal) form.elements.goal.value=selectedGoal;
}
