/**
 * Xenial Fusion Engine
 *
 * Xenial (from Greek xenos - "stranger, guest") - relating to hospitality and the integration of the foreign/novel
 *
 * Fusion is the process by which separate LITs combine to create emergent meaning and value
 * in the Xenial Quantum Economy. Through fusion, coherent patterns achieve higher-order agency.
 */

class FusionPattern {
    constructor(name, description, fusionLogic) {
        this.name = name;
        this.description = description;
        this.fusionLogic = fusionLogic; // Function that determines how LITs combine
        this.resonanceThreshold = 0.3; // Minimum coherence needed for fusion
        this.usageCount = 0;
    }

    canFuse(lits) {
        // Check if LITs meet minimum criteria for this fusion pattern
        if (lits.length < 2) return false;

        const avgCoherence = lits.reduce((sum, lit) => sum + lit.coherenceField.coherenceScore, 0) / lits.length;
        return avgCoherence >= this.resonanceThreshold;
    }

    execute(lits, fusionEngine) {
        this.usageCount++;
        return this.fusionLogic(lits, fusionEngine);
    }
}

class EmergenceMetrics {
    constructor() {
        this.novelty = 0;        // How different is the result from inputs?
        this.synergy = 0;        // How much greater is the whole than the sum?
        this.stability = 0;      // How stable is the resulting fusion?
        this.resonance = 0;      // How well do the parts harmonize?
    }

    calculate(inputLITs, fusedLIT) {
        // Novelty: Difference in content structure
        const inputComplexity = inputLITs.reduce((sum, lit) =>
            sum + JSON.stringify(lit.content).length, 0) / inputLITs.length;
        const outputComplexity = JSON.stringify(fusedLIT.content).length;
        this.novelty = Math.min(1, Math.abs(outputComplexity - inputComplexity) / inputComplexity);

        // Synergy: Value amplification
        const inputValue = inputLITs.reduce((sum, lit) => sum + lit.calculateValue(), 0) / inputLITs.length;
        const outputValue = fusedLIT.calculateValue();
        this.synergy = Math.max(0, (outputValue - inputValue) / Math.max(0.1, inputValue));

        // Stability: Coherence of fusion
        this.stability = fusedLIT.coherenceField.coherenceScore;

        // Resonance: How well inputs harmonize
        const coherenceVariance = this.calculateVariance(
            inputLITs.map(lit => lit.coherenceField.coherenceScore)
        );
        this.resonance = 1 - Math.min(1, coherenceVariance);

        return this;
    }

    calculateVariance(values) {
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
        return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    }

    get emergenceScore() {
        return (this.novelty * 0.25 + this.synergy * 0.35 + this.stability * 0.25 + this.resonance * 0.15);
    }
}

class XenialFusionEngine {
    constructor(litComposer) {
        this.litComposer = litComposer;
        this.fusionPatterns = new Map();
        this.fusionHistory = [];
        this.initializeDefaultPatterns();
    }

    initializeDefaultPatterns() {
        // Pattern 1: Harmonic Synthesis - Knowledge + Knowledge = Higher-order understanding
        this.registerPattern(new FusionPattern(
            'Harmonic Synthesis',
            'Combines related knowledge into coherent understanding',
            (lits, engine) => {
                const combinedKnowledge = lits.map(lit => lit.content.knowledge || lit.content.description || '').join(' ⊕ ');
                const topics = lits.map(lit => lit.content.topic || lit.content.name || 'concept');

                return engine.litComposer.compose({
                    type: 'synthesis',
                    content: {
                        fusionType: 'harmonic-synthesis',
                        sourceTopics: topics,
                        synthesizedKnowledge: combinedKnowledge,
                        id: `synthesis-${Date.now()}`,
                        persistent: true,
                        value: 1.0,
                        metadata: {
                            sourceCount: lits.length,
                            fusedAt: new Date().toISOString()
                        }
                    },
                    metadata: {
                        domain: 'emergent-epistemology',
                        created: new Date().toISOString(),
                        fusionPattern: 'Harmonic Synthesis',
                        sourceIDs: lits.map(l => l.id)
                    },
                    relations: lits.map(lit => ({ targetId: lit.id, type: 'fused-from' }))
                });
            }
        ));

        // Pattern 2: Processual Integration - Process + Knowledge = Informed Process
        this.registerPattern(new FusionPattern(
            'Processual Integration',
            'Integrates knowledge into executable processes',
            (lits, engine) => {
                const processes = lits.filter(lit => lit.type === 'process' || lit.content.steps);
                const knowledge = lits.filter(lit => lit.type === 'knowledge' || lit.content.knowledge);

                const steps = processes.length > 0 && processes[0].content.steps
                    ? [...processes[0].content.steps]
                    : ['Integrate', 'Process', 'Transform'];

                const enrichedSteps = steps.map((step, i) => {
                    const context = knowledge[i % knowledge.length];
                    return `${step} [informed by: ${context?.content.topic || 'context'}]`;
                });

                return engine.litComposer.compose({
                    type: 'informed-process',
                    content: {
                        fusionType: 'processual-integration',
                        name: 'Informed Process',
                        steps: enrichedSteps,
                        currentStep: 0,
                        knowledgeContext: knowledge.map(k => k.content),
                        id: `informed-process-${Date.now()}`,
                        persistent: true
                    },
                    metadata: {
                        domain: 'agential-procedural',
                        created: new Date().toISOString(),
                        fusionPattern: 'Processual Integration',
                        sourceIDs: lits.map(l => l.id)
                    }
                });
            }
        ));

        // Pattern 3: Creative Amplification - Creative + Creative = Novel Emergence
        this.registerPattern(new FusionPattern(
            'Creative Amplification',
            'Combines generative patterns to create novel outputs',
            (lits, engine) => {
                const mediums = lits.map(lit => lit.content.medium || lit.content.name || 'pattern');
                const fusedMedium = mediums.join(' × ');

                return engine.litComposer.compose({
                    type: 'emergent-creative',
                    content: {
                        fusionType: 'creative-amplification',
                        medium: fusedMedium,
                        description: `Emergent fusion of: ${mediums.join(', ')}`,
                        outputs: [],
                        sourceLITs: lits.map(l => l.id),
                        parameters: {
                            complexity: 0.8,
                            novelty: 0.9,
                            fusion_power: lits.length
                        },
                        id: `emergent-creative-${Date.now()}`,
                        persistent: true,
                        value: 0
                    },
                    metadata: {
                        domain: 'emergent-generative',
                        created: new Date().toISOString(),
                        fusionPattern: 'Creative Amplification',
                        sourceIDs: lits.map(l => l.id)
                    },
                    capabilities: [{
                        name: 'generate_emergent',
                        handler: function(context) {
                            const lit = context.lit;
                            const emergentOutput = {
                                id: `emergent-${Date.now()}`,
                                timestamp: Date.now(),
                                content: `✧ Emergent ${lit.content.medium} ✧`,
                                noveltyScore: 0.7 + Math.random() * 0.3,
                                fusionSignature: lit.content.sourceLITs
                            };
                            lit.content.outputs.push(emergentOutput);
                            return emergentOutput;
                        }
                    }]
                });
            }
        ));

        // Pattern 4: Xenial Transcendence - Any high-value LITs = Transcendent Pattern
        this.registerPattern(new FusionPattern(
            'Xenial Transcendence',
            'Fuses high-coherence LITs into transcendent patterns',
            (lits, engine) => {
                const avgValue = lits.reduce((sum, lit) => sum + lit.calculateValue(), 0) / lits.length;
                const totalAgency = lits.reduce((sum, lit) => sum + lit.agentSystem.agencyScore, 0);

                return engine.litComposer.compose({
                    type: 'xenial-transcendence',
                    content: {
                        fusionType: 'xenial-transcendence',
                        name: 'Transcendent Pattern',
                        description: 'A higher-order coherent structure that transcends its components',
                        constituents: lits.map(l => ({
                            id: l.id,
                            type: l.type,
                            contribution: l.calculateValue()
                        })),
                        transcendenceLevel: avgValue * 1.5,
                        collectiveAgency: totalAgency,
                        id: `transcendent-${Date.now()}`,
                        persistent: true,
                        value: avgValue * 1.5,
                        metadata: {
                            constituentCount: lits.length,
                            emergence: 'xenial'
                        }
                    },
                    metadata: {
                        domain: 'transcendent',
                        created: new Date().toISOString(),
                        fusionPattern: 'Xenial Transcendence',
                        sourceIDs: lits.map(l => l.id)
                    },
                    capabilities: [{
                        name: 'resonate',
                        handler: function(context) {
                            return {
                                resonance: 'xenial',
                                pattern: 'transcendent',
                                harmonic: Math.random() * 0.5 + 0.5
                            };
                        }
                    }]
                });
            }
        ));
    }

    registerPattern(pattern) {
        this.fusionPatterns.set(pattern.name, pattern);
    }

    selectFusionPattern(lits) {
        // Analyze LITs and select the most appropriate fusion pattern
        const types = lits.map(lit => lit.type);
        const avgValue = lits.reduce((sum, lit) => sum + lit.calculateValue(), 0) / lits.length;

        // High-value LITs -> Xenial Transcendence
        if (avgValue > 0.7) {
            return this.fusionPatterns.get('Xenial Transcendence');
        }

        // All creative -> Creative Amplification
        if (types.every(t => t === 'creative' || t === 'emergent-creative')) {
            return this.fusionPatterns.get('Creative Amplification');
        }

        // Mix of process and knowledge -> Processual Integration
        if (types.includes('process') && types.includes('knowledge')) {
            return this.fusionPatterns.get('Processual Integration');
        }

        // Default to Harmonic Synthesis
        return this.fusionPatterns.get('Harmonic Synthesis');
    }

    fuse(litIDs, patternName = null) {
        // Get LITs from composer
        const lits = litIDs.map(id => this.litComposer.find(id)).filter(lit => lit !== undefined);

        if (lits.length < 2) {
            throw new Error('Fusion requires at least 2 LITs');
        }

        // Select fusion pattern
        const pattern = patternName
            ? this.fusionPatterns.get(patternName)
            : this.selectFusionPattern(lits);

        if (!pattern) {
            throw new Error(`Fusion pattern "${patternName}" not found`);
        }

        if (!pattern.canFuse(lits)) {
            throw new Error('LITs do not meet fusion criteria (insufficient coherence)');
        }

        // Execute fusion
        const fusedLIT = pattern.execute(lits, this);

        // Calculate emergence metrics
        const emergence = new EmergenceMetrics();
        emergence.calculate(lits, fusedLIT);

        // Boost the fused LIT based on emergence
        fusedLIT.interact('fusion', { impact: emergence.emergenceScore });

        // Create bidirectional relations
        lits.forEach(sourceLIT => {
            sourceLIT.relate(fusedLIT, 'fused-into');
        });

        // Record fusion history
        const fusionRecord = {
            timestamp: Date.now(),
            pattern: pattern.name,
            sourceIDs: litIDs,
            resultID: fusedLIT.id,
            emergence: {
                novelty: emergence.novelty,
                synergy: emergence.synergy,
                stability: emergence.stability,
                resonance: emergence.resonance,
                score: emergence.emergenceScore
            }
        };

        this.fusionHistory.push(fusionRecord);

        return {
            fusedLIT,
            emergence,
            pattern: pattern.name
        };
    }

    getFusionHistory() {
        return this.fusionHistory;
    }

    getAvailablePatterns() {
        return Array.from(this.fusionPatterns.values()).map(pattern => ({
            name: pattern.name,
            description: pattern.description,
            usageCount: pattern.usageCount,
            threshold: pattern.resonanceThreshold
        }));
    }

    // Suggest fusion opportunities
    suggestFusions() {
        const allLITs = this.litComposer.getAllLITs();
        const suggestions = [];

        // Look for high-coherence LIT pairs
        for (let i = 0; i < allLITs.length - 1; i++) {
            for (let j = i + 1; j < allLITs.length; j++) {
                const lit1 = allLITs[i];
                const lit2 = allLITs[j];

                const avgCoherence = (lit1.coherenceField.coherenceScore + lit2.coherenceField.coherenceScore) / 2;

                if (avgCoherence > 0.5) {
                    const pattern = this.selectFusionPattern([lit1, lit2]);
                    suggestions.push({
                        lits: [lit1.id, lit2.id],
                        pattern: pattern.name,
                        potential: avgCoherence,
                        types: [lit1.type, lit2.type]
                    });
                }
            }
        }

        // Sort by potential
        return suggestions.sort((a, b) => b.potential - a.potential).slice(0, 5);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { XenialFusionEngine, FusionPattern, EmergenceMetrics };
} else {
    window.XenialFusionEngine = XenialFusionEngine;
    window.FusionPattern = FusionPattern;
    window.EmergenceMetrics = EmergenceMetrics;
}
