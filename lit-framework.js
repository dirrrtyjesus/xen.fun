/**
 * LIT Framework - Luminous Information Token Composition System
 *
 * A LIT is a packet of coherent, agential information.
 * It is not data; it is meaning that has achieved a stable, transmissible form.
 *
 * Value = f(coherence, agency, temporal_signature)
 */

class TemporalSignature {
    constructor() {
        this.createdAt = Date.now();
        this.lastModified = Date.now();
        this.interactions = [];
        this.persistence = 0; // Measured in quantum time units
    }

    record(interaction) {
        this.interactions.push({
            timestamp: Date.now(),
            type: interaction.type,
            impact: interaction.impact
        });
        this.lastModified = Date.now();
        this.updatePersistence();
    }

    updatePersistence() {
        const age = Date.now() - this.createdAt;
        const interactionDensity = this.interactions.length / (age / 1000);
        this.persistence = Math.log(1 + age) * (1 + interactionDensity);
    }

    get halfLife() {
        // Calculate the temporal stability of this LIT
        const baseDecay = 86400000; // 24 hours in ms
        const interactionBonus = this.interactions.reduce((sum, i) => sum + (i.impact || 0), 0);
        return baseDecay * (1 + interactionBonus);
    }

    get temporalValue() {
        const age = Date.now() - this.createdAt;
        const decay = Math.exp(-age / this.halfLife);
        return this.persistence * decay;
    }
}

class AgentSystem {
    constructor(capabilities = []) {
        this.capabilities = capabilities;
        this.autonomy = 0;
        this.intentionality = 0;
        this.effectivity = 0;
    }

    defineCapability(name, handler) {
        this.capabilities.push({ name, handler, uses: 0 });
        this.calculateAgency();
    }

    executeCapability(name, context) {
        const capability = this.capabilities.find(c => c.name === name);
        if (!capability) {
            throw new Error(`Capability "${name}" not found`);
        }

        capability.uses++;
        const result = capability.handler(context);
        this.calculateAgency();

        return result;
    }

    calculateAgency() {
        // Autonomy: Can the LIT act without external input?
        this.autonomy = Math.min(1, this.capabilities.length / 10);

        // Intentionality: Does the LIT have clear goals?
        const totalUses = this.capabilities.reduce((sum, c) => sum + c.uses, 0);
        this.intentionality = Math.min(1, Math.log(1 + totalUses) / 5);

        // Effectivity: Can the LIT produce meaningful results?
        const activeCapabilities = this.capabilities.filter(c => c.uses > 0).length;
        this.effectivity = activeCapabilities / Math.max(1, this.capabilities.length);
    }

    get agencyScore() {
        return (this.autonomy + this.intentionality + this.effectivity) / 3;
    }
}

class CoherenceField {
    constructor(content) {
        this.content = content;
        this.structure = null;
        this.consistency = 0;
        this.resonance = 0;
        this.entropy = 0;
        this.analyze();
    }

    analyze() {
        // Measure internal consistency
        this.consistency = this.measureConsistency();

        // Measure resonance with XQE substrate
        this.resonance = this.measureResonance();

        // Measure information entropy
        this.entropy = this.measureEntropy();
    }

    measureConsistency() {
        // Simple consistency check based on content structure
        if (typeof this.content === 'string') {
            // For text: measure coherence through pattern stability
            const words = this.content.split(/\s+/);
            const uniqueWords = new Set(words);
            return Math.min(1, uniqueWords.size / words.length);
        }

        if (typeof this.content === 'object' && this.content !== null) {
            // For objects: measure structural consistency
            const keys = Object.keys(this.content);
            const definedValues = keys.filter(k => this.content[k] !== undefined && this.content[k] !== null);
            return definedValues.length / Math.max(1, keys.length);
        }

        return 0.5; // Default middle value
    }

    measureResonance() {
        // Resonance with the XQE substrate
        // Higher resonance = more aligned with quantum economic principles
        const resonanceFactors = {
            hasMetadata: this.content.metadata ? 0.2 : 0,
            hasIdentity: this.content.id ? 0.2 : 0,
            hasRelations: this.content.relations ? 0.2 : 0,
            hasValue: this.content.value !== undefined ? 0.2 : 0,
            isPersistent: this.content.persistent ? 0.2 : 0
        };

        return Object.values(resonanceFactors).reduce((sum, val) => sum + val, 0);
    }

    measureEntropy() {
        // Lower entropy = more ordered information
        const contentStr = JSON.stringify(this.content);
        const charFreq = {};

        for (const char of contentStr) {
            charFreq[char] = (charFreq[char] || 0) + 1;
        }

        let entropy = 0;
        const total = contentStr.length;

        for (const count of Object.values(charFreq)) {
            const probability = count / total;
            entropy -= probability * Math.log2(probability);
        }

        // Normalize to 0-1 range (typical text entropy is 4-5 bits)
        return Math.min(1, entropy / 8);
    }

    get coherenceScore() {
        // Balance between consistency, resonance, and optimal entropy
        const optimalEntropy = 1 - Math.abs(0.6 - this.entropy);
        return (this.consistency * 0.4 + this.resonance * 0.4 + optimalEntropy * 0.2);
    }
}

class LIT {
    constructor(config = {}) {
        // Core identity
        this.id = config.id || this.generateId();
        this.type = config.type || 'generic';
        this.version = config.version || '1.0.0';

        // Content
        this.content = config.content || {};
        this.metadata = config.metadata || {};

        // Three pillars of LIT value
        this.coherenceField = new CoherenceField(this.content);
        this.agentSystem = new AgentSystem(config.capabilities || []);
        this.temporalSignature = new TemporalSignature();

        // Relations to other LITs
        this.relations = config.relations || [];

        // State
        this.state = 'nascent'; // nascent, stable, resonant, transcendent, decaying

        // Initialize
        this.updateState();
    }

    generateId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 9);
        return `LIT-${timestamp}-${random}`;
    }

    // Core interaction methods
    interact(type, data) {
        this.temporalSignature.record({ type, impact: data.impact || 0.1 });
        this.updateState();

        return {
            litId: this.id,
            type,
            result: data,
            newValue: this.calculateValue()
        };
    }

    transform(transformFn) {
        const newContent = transformFn(this.content);
        this.content = newContent;
        this.coherenceField = new CoherenceField(this.content);
        this.temporalSignature.record({ type: 'transform', impact: 0.5 });
        this.updateState();

        return this;
    }

    relate(otherLit, relationType) {
        this.relations.push({
            targetId: otherLit.id,
            type: relationType,
            establishedAt: Date.now()
        });

        this.temporalSignature.record({ type: 'relate', impact: 0.3 });
        return this;
    }

    // Value calculation
    calculateValue() {
        const coherence = this.coherenceField.coherenceScore;
        const agency = this.agentSystem.agencyScore;
        const temporal = this.temporalSignature.temporalValue;

        // Value is emergent from the interaction of all three factors
        const baseValue = (coherence * 0.4 + agency * 0.35 + temporal * 0.25);

        // Network effects from relations
        const networkBonus = Math.log(1 + this.relations.length) / 5;

        return Math.min(1, baseValue * (1 + networkBonus));
    }

    updateState() {
        const value = this.calculateValue();

        if (value < 0.2) {
            this.state = 'decaying';
        } else if (value < 0.4) {
            this.state = 'nascent';
        } else if (value < 0.6) {
            this.state = 'stable';
        } else if (value < 0.8) {
            this.state = 'resonant';
        } else {
            this.state = 'transcendent';
        }
    }

    // Serialization
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            version: this.version,
            content: this.content,
            metadata: this.metadata,
            value: this.calculateValue(),
            coherence: this.coherenceField.coherenceScore,
            agency: this.agentSystem.agencyScore,
            temporal: this.temporalSignature.temporalValue,
            state: this.state,
            relations: this.relations,
            timestamp: Date.now()
        };
    }

    static fromJSON(data) {
        return new LIT({
            id: data.id,
            type: data.type,
            version: data.version,
            content: data.content,
            metadata: data.metadata,
            relations: data.relations
        });
    }
}

// LIT Composer - High-level API for creating LITs
class LITComposer {
    constructor() {
        this.registry = new Map();
    }

    compose(config) {
        const lit = new LIT(config);
        this.registry.set(lit.id, lit);
        return lit;
    }

    find(id) {
        return this.registry.get(id);
    }

    findByType(type) {
        return Array.from(this.registry.values()).filter(lit => lit.type === type);
    }

    getAllLITs() {
        return Array.from(this.registry.values());
    }

    // Create a LIT network
    network(lits, relationType = 'connected') {
        for (let i = 0; i < lits.length - 1; i++) {
            lits[i].relate(lits[i + 1], relationType);
        }
        return lits;
    }

    // Measure network coherence
    measureNetworkCoherence() {
        const lits = this.getAllLITs();
        if (lits.length === 0) return 0;

        const totalValue = lits.reduce((sum, lit) => sum + lit.calculateValue(), 0);
        return totalValue / lits.length;
    }
}

// Export for use in browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LIT, LITComposer, TemporalSignature, AgentSystem, CoherenceField };
} else {
    window.LIT = LIT;
    window.LITComposer = LITComposer;
    window.TemporalSignature = TemporalSignature;
    window.AgentSystem = AgentSystem;
    window.CoherenceField = CoherenceField;
}
