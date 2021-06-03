const content = `
<h2>1. 자료구조</h2>
<h3>📖 스택과 큐</h3>
<ul>
  <li>
    <strong>Stack</strong>: 선형 자료구조의 일종으로 Last In First Out
    (LIFO). 즉, 나중에 들어간 원소가 먼저 나온다.
  </li>
</ul>
<ul>
  <li>
    <strong>Queue</strong>: 선형 자료구조의 일종으로 First In First
    Out (FIFO). 즉, 먼저 들어간 놈이 먼저 나온다.
  </li>
</ul>
<br />
<h3>📖 이진 트리</h3>
<p>
  ➡️ 루트 노드를 중심으로 두 개의 서브 트리(큰 트리에 속하는 작은
  트리)로 나뉘어 진다. 또한 나뉘어진 두 서브 트리도 모두 이진 트리어야
  한다.
</p>
<p>
  각 부모 노드에서 파생되는 자식 노드의 개수는 최대 2개까지로 구성된
  트리이다.
</p>
<ul>
  <li>
    <strong>포화 이진 트리(Perfect)</strong>: 모든 레벨이 꽉 찬 이진
    트리를 의미한다.
  </li>
</ul>
<ul>
  <li>
    <p>
      <strong>완전 이진 트리(Complete)</strong>: 부모, 왼쪽 자식,
      오른쪽 자식 순으로 채워지는 트리를 말하며, 마지막 레벨을
      제외하고 모든 노드가 가득 차 있어야 한다.
    </p>
  </li>
  <li>
    <p>
      <strong>정 이진 트리(Full)</strong>: 각 내부 노드가 두 개의 자식
      노드는 가지는 트리입니다. (0개 or 2개)
    </p>
  </li>
</ul>
<br />
<h3>📖 이진 탐색 트리</h3>
<p>
  ➡️ 부모 노드를 기준으로 왼쪽의 자식들은 부모 노드보다 작고 오른쪽
  자식들은 부모 노드보다 크다는 규칙을 따르는 이진 트리이다.
</p>
<br />
<h3>📖 힙(Heap)</h3>
<ul>
  <li>
    최대 힙(max heap)
    <ul>
      <li>
        부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전
        이진 트리
      </li>
      <li>
        key(부모 노드) &gt;= key(자식 노드)<br />
        <br />
      </li>
    </ul>
  </li>
  <li>
    최소 힙(min heap)
    <ul>
      <li>
        부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전
        이진 트리
      </li>
      <li>key(부모 노드) &lt;= key(자식 노드)</li>
    </ul>
  </li>
</ul>
<br />
<h3>📖 해시 테이블</h3>
<p>
  ➡️ 해시 테이블은 효율적인 탐색을 위한 자료구조로 key를 Value에
  대응시킨다.
</p>
<p>
  <img
    src="https://media.vlpt.us/images/holim0/post/ee74be4a-4a7a-467b-a0cb-15770e344302/image.png"
  />
</p>
<p>
  해시 테이블은<strong> 충돌(Collision)</strong>이 일어날 수 있다.
</p>
<p><strong>&lt;해결법&gt;</strong></p>
<ol>
  <li><strong>Chaining</strong></li>
</ol>
<ul>
  <li>
    충돌이 일어난 경우 그냥 연결 리스트 뒤에 삽입을 해주면 된다.
  </li>
</ul>
<p>
  <img
    src="https://media.vlpt.us/images/holim0/post/ae301f22-7d05-4724-a474-c07a73a9303f/image.png"
  />
</p>
<ol start="2">
  <li><strong>Open Addressing</strong></li>
</ol>
<ul>
  <li>
    충돌이 일어날 경우 다른 빈공간의 주소를 이용할 수 있게 한다.
  </li>
</ul>
<p>
  <img
    src="https://media.vlpt.us/images/holim0/post/e4c7f2e1-754a-4776-89dd-7ecbaab807bb/image.png"
  />
</p>
<blockquote>
  <p>
    <a
      href="https://en.wikipedia.org/wiki/Hash_table#Separate_chaining"
      >사진 출처</a
    >
  </p>
</blockquote>
<br />
<h3>📖 LinkedList와 Array</h3>
<p>
  ➡️ Array 는 삽입, 삭제가 O(n)의 시간 복잡도를 가지지만 LinkedList는
  O(1)를 가진다.(정확히는 상황에 따라 다르다)
</p>
<ul>
  <li>
    맨 끝 값을 알고 있다면 O(1), 모르면 O(N), 중간에 삽입도 마찬가지로
    O(n), 처음에 삽입은 O(1)
  </li>
</ul>
<p>
  반면 특정 요소에 접근할 때에는 Array는 O(1), LinkedList는 O(n)의
  시간 복잡도를 가진다.
</p>
<p>
  Array는 인덱스로 접근이 가능하지만 LinkedList는 Search를 해야 된다.
</p>
<hr />
<br />
<h2>2. 알고리즘 (손 코딩 필수 ✏️)</h2>
<h3>📖 퀵 소트</h3>
<p>➡️ 분할 정복의 방식으로 정렬을 수행한다. (불안정 정렬)</p>
<p>
  하나의 리스트를 피벗(pivot)을 기준으로 두 개의 비균등한 크기로
  분할하고 분할된 부분 리스트를 정렬한 다음, 두 개의 정렬된 부분
  리스트를 합하여 전체가 정렬된 리스트가 되게 하는 방법이다. (분할
  정복)
</p>
<pre class="language-js"><code class=" language-js">
#include <span class="token operator">&lt;</span>iostream<span class="token operator">&gt;</span>
using namespace std<span class="token punctuation">;</span>
<span class="token comment">//퀵정렬</span>
int n<span class="token punctuation">,</span>cnt<span class="token punctuation">,</span> quick<span class="token punctuation">[</span><span class="token number">10000001</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">quickSort</span><span class="token punctuation">(</span><span class="token parameter">int i<span class="token punctuation">,</span> int j</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token operator">&gt;=</span>j<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
int pivot <span class="token operator">=</span> quick<span class="token punctuation">[</span><span class="token punctuation">(</span>i<span class="token operator">+</span>j<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
int left <span class="token operator">=</span> i<span class="token punctuation">;</span>
int right <span class="token operator">=</span> j<span class="token punctuation">;</span>

<span class="token keyword">while</span><span class="token punctuation">(</span>left<span class="token operator">&lt;=</span>right<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">while</span><span class="token punctuation">(</span>quick<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token operator">&lt;</span>pivot<span class="token punctuation">)</span> left<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span>quick<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token operator">&gt;</span>pivot<span class="token punctuation">)</span> right<span class="token operator">--</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>left<span class="token operator">&lt;=</span>right<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token function">swap</span><span class="token punctuation">(</span>quick<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">,</span>quick<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
left<span class="token operator">++</span><span class="token punctuation">;</span> right<span class="token operator">--</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">quickSort</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">quickSort</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
<blockquote>
  <p>
    시간복잡도: <strong>O(nlogn)</strong><br />
    최악: <strong>O(n^2)</strong> - 이미 정렬된 리스트에 대해 퀵 정렬
    실행하는 경우
  </p>
</blockquote>
<p>
  ✅ 최악의 상황을 개선하기 위해서는 피벗을 배열을 중간 값으로
  설정하는 것이 좋다.
</p>
<br />
<h3>📖 머지 소트</h3>
<p>
  ➡️ 안정 정렬에 속하고 퀵소트와 마찬가지로 분할 정복 알고리즘 중
  하나이다.
</p>
<blockquote>
  <p>시간복잡도: <strong>O(nlogn)</strong></p>
</blockquote>
<br />
<h3>📖 힙 소트</h3>
<p>
  ➡️ 최대 힙 트리나 최소 힙 트리를 구성해 정렬을 하는 방법이다.
  내림차순 정렬을 위해서는 최대 힙을 구성하고 오름차순 정렬을 위해서는
  최소 힙을 구성하면 된다.
</p>
<blockquote>
  <p>시간복잡도: <strong>O(nlogn)</strong></p>
</blockquote>
<br />
<h3>📖 버블 소트</h3>
<p>➡️ 서로 인접한 두 원소를 비교해서 정렬하는 알고리즘</p>
<pre class="language-js"><code class=" language-js">
<span class="token keyword">function</span> <span class="token function">bubble_sort</span><span class="token punctuation">(</span><span class="token parameter">list<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token keyword">let</span> i<span class="token punctuation">,</span> j<span class="token punctuation">,</span> temp<span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token comment">// 0 ~ (i-1)까지 반복</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>j<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span>i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token comment">// j번째와 j+1번째의 요소가 크기 순이 아니면 교환</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>list<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token operator">&gt;</span>list<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 temp <span class="token operator">=</span> list<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
 list<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> list<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
 list<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
<blockquote>
  <p>시간 복잡도: <strong>O(n^2)</strong></p>
</blockquote>
<hr />
<br />
<h2>3. 운영체제</h2>
<h3>📖 컴파일러와 인터프리터</h3>
<p>
  ➡️ 컴파일러와 인터프리터 모두 고레벨 언어를 기계어로 변환하는 역할을
  수행
</p>
<p>
  컴파일러는 전체 코드를 보고 한번에 해석하지만 인터프리터는
  소스코드의 각 행을 연속적으로 분석하며 실행한다.
</p>
<p>
  인터프리터는 고레벨 언어를 중간 레벨 언어로 한 번 변환하고 이를 각
  행마다 실행하기 때문에 일반적으로 컴파일러가 인터프리터보다 실행
  시간이 빠른 경우가 많다.
</p>
<br />
<h3>📖 프로세스와 쓰레드</h3>
<ul>
  <li>
    <strong>프로세스</strong>: 현재 실행 중인 프로그램을 의미한다.
    (메모리에 올라와 있음)
  </li>
</ul>
<ul>
  <li>
    <p>
      <strong>쓰레드</strong>: 프로세스 내에서 할당받은 자원을 이용해
      동작하는 실행 단위
    </p>
    <ul>
      <li>code, data, heap 영역을 다른 쓰레드와 공유한다.</li>
    </ul>
    <br />
  </li>
</ul>
<h3>📖 컨텍스트 스위칭</h3>
<p>
  ➡️ Context Switching이란 인터럽트를 발생시켜 CPU에서 실행중인
  프로세스를 중단하고, 다른 프로세스를 처리하기 위한 과정
</p>
<ul>
  <li>
    인터럽트: CPU가 프로세스를 실행하고 있을 때, 입출력 하드웨어 등의
    장치나 예외상황이 발생하여 처리가 필요함을 CPU에게 알리는 것을
    말합니다.<br />
    <br />
  </li>
</ul>
<h3>📖 임계영역과 임계자원</h3>
<p>
  ➡️ 두 개 이상의 프로세스가 동시에 사용할 수 없는 자원을
  임계자원(Critical Resource)라고 한다. 그리고 이에 대해 접근하고
  실행하는 프로그램 내의 코드 부분을 임계영역(Critical Section)이라고
  한다.
</p>
<br />
<h3>📖 교착상태(Deadlock)</h3>
<p>
  ➡️ 둘 이상의 프로세스가 자원을 각자 가지고 있는 채로 계속해서
  기다리고 있는 상태를 의미한다. (외부적 조치가 없는 한)
</p>
<br />
<h3>📖 LRU(Least Recently Used) - 페이지 교체 알고리즘</h3>
<p>
  ➡️ LRU 알고리즘은 실제메모리의 페이지들 중에서 가장 오랫동안
  사용되지 않은 페이지를 선택하는 방식<br />
  <br />
</p>
<h3>📖 라운드 로빈 기법</h3>
<p>
  ➡️ 각 프로세스는 동일한 크기의 할당 시간(time quantum)을 갖게 된다.
  할당 시간이 지나면 프로세스는 선점당하고(CPU 뺏김) ready queue에
  들어가게 된다.<br />
  <br />
</p>
<h3>📖 다단계 큐(MLQ)와 다단계 피드백 큐(MFQ)</h3>
<ul>
  <li>
    <strong>다단계 큐</strong>: 우선순위만틈 큐를 만들어 프로세스를
    스케줄링하는 기법이다. 각 프로세스는 해당되는 우선순위 큐에
    들어가게 된다. (선점방식)
  </li>
</ul>
<ul>
  <li>
    <p><strong>다단계 피드백 큐</strong></p>
    <ul>
      <li>우선순위마다 준비 큐 형성</li>
      <li>
        항상 가장 높은 우선순위 큐의 프로세스에 CPU를 할당 (우선순위가
        낮은 큐에서 작업 실행 중이더라도 상위 단계의 큐에 프로세스가
        도착하면 CPU를 빼앗는 선점형 스케줄링)
      </li>
      <li>
        프로세스가 시간 할당량을 다 사용하면 우선순위가 낮아지게 된다.
        (우선순위가 낮은 큐로 들어가게 된다.)
      </li>
    </ul>
  </li>
</ul>
<hr />
<br />
<h2 id="4-네트워크">4. 네트워크</h2>
<h3 id="tcpudp">TCP/UDP</h3>
<ul>
  <li>
    TCP(Trasmission Control Protocol, 전송 제어 프로토콜)
    <ul>
      <li>
        연결지향: TCP 3 way handshake =&gt; 논리적으로 클라와 서버가
        연결
      </li>
      <li>데이터 전달 보증</li>
      <li>순서 보장</li>
      <li>신뢰할 수 있는 프로토콜</li>
      <li>현재는 대부분 TCP를 사용</li>
    </ul>
  </li>
</ul>
<ul>
  <li>
    UDP(User Datagram Protocal, 사용자 데이터크램 프로토콜)
    <ul>
      <li>IP와 거의 같다. +PORT + 체크섬 정도만 추가</li>
      <li>애플리케이션에서 추가 작업 필요</li>
    </ul>
  </li>
</ul>
<h3>PORT</h3>
<p>➡️ 같은 IP 내에서 프로세스 구분을 하기 위해 사용된다.</p>
<ul>
  <li>패킷을 보낼 때 PORT 정보를 보내기 때문에 식별할 수 있다.</li>
</ul>
<p>IP =&gt; 아파트</p>
<p>PORT =&gt; 호수</p>
<h3>DNS(Domain Name System)</h3>
<p>➡️ IP는 기억하기 어렵고 변경될 수 있다.</p>
<p>그래서 도메인으로 찾는 것이다. 도메인에 IP 주소를 등록시킨다.</p>
<hr />
<br />
<h2>6. 데이터 베이스</h2>
<p>
  <img
    src="https://media.vlpt.us/images/holim0/post/7ed7fd0e-2539-49ec-932c-18c1a9b8ebe5/image.png"
  />
</p>
<hr />
<h2>7. 공통</h2>
<h3>Call By Value와 Call by Reference</h3>
<ul>
  <li>
    <strong>Call By Value</strong>
    <ul>
      <li>인자로 받은 값을 복사하여 처리하는 방식</li>
      <li>넘어 온 값을 증가 시켜도 원래 값은 유지가 된다.</li>
      <li>값을 복사하여 넘기기 때문에 메모리 사용량이 늘어난다.</li>
    </ul>
  </li>
</ul>
<ul>
  <li>
    <strong>Call by Reference</strong>
    <ul>
      <li>
        인자로 받은 값의 주소를 참조하여 직접 값에 영향을 주는
        방식이다.
      </li>
      <li>값을 복사하지 않기 때문에 속도가 빠르다.</li>
      <li>원래 값에 영향을 줄 수 있는 위험이 있다.</li>
    </ul>
  </li>
</ul>
<br />
<h3>객체지향 프로그래밍</h3>
<p>
  ➡️ 프로그래밍에서 필요한 데이터를 추상화시켜 상태와 행위를 가진
  객체를 만들고 그
  <strong
    >객체들 간의 유기적인 상호작용을 통해 로직을 구성하는 프로그래밍
    방법</strong
  >
</p>
<ul>
  <li>
    <strong>추상화</strong>: 공통의 속성이나 기능을 묶어 이름을 붙이는
    것
  </li>
</ul>
<ul>
  <li>
    <strong>캡슐화</strong>: 객체가 내부적으로 기능을 어떻게
    구현하는지를 감추는 것
  </li>
</ul>
<ul>
  <li>
    <strong>상속</strong>: 부모클래스의 속성과 기능을 그대로 이어받아
    사용할 수 있게하고 기능의 일부분을 변경해야 할 경우 상속받은
    자식클래스에서 해당 기능만 다시 수정(정의)하여 사용할 수 있게 하는
    것
  </li>
</ul>
<ul>
  <li>
    <strong>다형성</strong>: 하나의 변수명, 함수명 등이 상황에 따라
    다른 의미로 해석될 수 있는 것
  </li>
</ul>
<blockquote>
  <p>💡 오버로딩과 오버라이딩의 차이</p>
  <ul>
    <li>
      <strong>오버로딩</strong>: 같은 이름의 메소드를 여러 개 가지면서
      매개 변수를 다르게 지정하는 것
    </li>
    <li>
      <strong>오버라이딩</strong>: 상위 클래스(부모 클래스)가 갖고
      있는 메소드(자식 클래스)를 하위 클래스에서 재정의해 사용하는 것
    </li>
  </ul>
</blockquote>
<hr />
<h2>References</h2>
<blockquote>
  <p>
    <a href="https://jeong-pro.tistory.com/95"
      >https://jeong-pro.tistory.com/95</a
    ><br />
    <a
      href="https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#stack-and-queue"
      >https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#stack-and-queue</a
    >
  </p>
</blockquote>
`

export default content
