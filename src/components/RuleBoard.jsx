import React from 'react';

const RuleBoard = ({ onDamage }) => {
    const handleDamage = (amount, reason) => {
        if (onDamage) {
            onDamage(amount, reason);
        }
    };

    const buttonStyle = {
        cursor: 'pointer',
        marginBottom: '5px',
        transition: 'transform 0.1s',
        display: 'block',
        width: '100%'
    };

    return (
        <div className="pixel-box" style={{
            width: '90%',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            backgroundColor: 'rgba(0,0,0,0.9)'
        }}>
            {/* Danger Zones */}
            <div>
                <h3 className="text-neon-red" style={{ borderBottom: '2px solid var(--neon-red)', paddingBottom: '5px' }}>
                    🟥 위험 지역 (함정 발동!)
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#aaa' }}>▶ [클릭 시 벌주 1잔 데미지]</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={buttonStyle} onClick={() => handleDamage(10, '해저드')}>🌊 해저드 (물에 빠진 공)</li>
                    <li style={buttonStyle} onClick={() => handleDamage(10, 'OB')}>🚧 OB (Out of Bounds)</li>
                    <li style={buttonStyle} onClick={() => handleDamage(10, '벙커')}>🏖️ 벙커 (모래무덤)</li>
                    <li style={buttonStyle} onClick={() => handleDamage(10, '카트도로')}>🛣️ 카트 도로</li>
                    <li style={buttonStyle} onClick={() => handleDamage(10, '쓰리펏')}>⛳ 쓰리펏</li>
                    <li style={buttonStyle} onClick={() => handleDamage(20, '양파')}>🧅 양파 (더블 파) [2배!]</li>
                </ul>
            </div>

            {/* Events & Skills */}
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <h3 className="text-neon-blue" style={{ borderBottom: '2px solid var(--neon-blue)', paddingBottom: '5px' }}>
                        🟦 특별 이벤트
                    </h3>
                    <div style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleDamage(0, '버디')}>
                        🦅 버디 달성 시 <br />
                        <span style={{ fontSize: '0.8rem', color: 'var(--neon-green)' }}>▶ [효과: 버디 유저 제외 전원 1잔]</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-neon-yellow" style={{ borderBottom: '2px solid var(--neon-yellow)', paddingBottom: '5px' }}>
                        🟨 활성 스킬
                    </h3>
                    <div style={{ cursor: 'pointer' }} onClick={() => handleDamage(10, '멀리건')}>
                        🔄 멀리건 발동 <br />
                        <span style={{ fontSize: '0.8rem', color: 'var(--neon-red)' }}>▶ [비용: 사용료 벌주 1잔 지불]</span>
                    </div>
                </div>
            </div>

            {/* Checkpoints */}
            <div style={{ gridColumn: '1 / -1', borderTop: '2px dashed white', paddingTop: '10px', marginTop: '10px' }}>
                <h3 style={{ color: 'white' }}>🚩 필수 체크포인트 (정기 검문소)</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div>☠️ 1번 홀</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--neon-yellow)' }}>시작!</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div>☠️ 6번 홀</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--neon-yellow)' }}>중간 게임!</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div>☠️ 12번 홀</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--neon-yellow)' }}>거의 다 왔다!</div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px', color: 'var(--neon-red)', fontSize: '0.8rem' }}>
                    ▶ [규칙: 전원 1잔 완샷 후 티오프 진행]
                </div>
            </div>
        </div>
    );
};

export default RuleBoard;
