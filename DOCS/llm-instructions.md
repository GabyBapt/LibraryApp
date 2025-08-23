I need you to implement a comprehensive help and documentation system for this application. This should include both user-facing help and developer documentation to prevent future confusion and circular debugging.

### 🎯 **Requirements:**

#### 1. **Feature Map Comments**
Add feature map comments to the top of EVERY major component file that lists:
- All related files for this feature
- Store/state sections it uses
- Dependencies and imports
- Related components
- Any critical constraints or "never do this" warnings

Format:
```
/* FEATURE MAP: [Feature Name]
 * Files: [list all related files]
 * Store: [state sections, actions, getters used]
 * Dependencies: [external libs, APIs, other components]
 * Related: [other components that interact with this]
 * 
 * CRITICAL: [any important constraints or warnings]
 */
```

#### 2. **Central Help Registry**
Create a central help system file (help/feature-help.ts or similar) with:
- Structured help content for each major feature
- User-friendly explanations in plain language
- Step-by-step workflows
- Pro tips and troubleshooting
- Developer implementation notes
- File mapping for each feature

Structure each help entry with:
- **title** - Feature name
- **description** - One-line summary
- **sections**:
  - **whatIs** - What this feature does in plain language
  - **howTo** - Step-by-step usage instructions
  - **tips** - Pro tips and best practices
  - **troubleshooting** - Common issues and solutions
  - **developerNotes** (optional) - Implementation details, constraints, common bugs
- **fileMap** - Lists primary/secondary files, styles, store sections

#### 3. **Reusable Help Component**
Create a reusable help button/modal component that:
- Shows a ? icon that opens help content
- Takes a featureKey prop to load the right help content
- Displays help in a readable modal/popup
- Supports markdown formatting
- Has proper accessibility (ESC to close, focus management)

#### 4. **Help Integration**
Add help buttons to major feature interfaces:
- In modal/dialog headers next to titles
- In sidebar headers for complex features
- Near settings panels and configuration areas
- Anywhere users might get confused

### 🎨 **Implementation Pattern:**

1. **Start with feature map comments** - Document what files are involved
2. **Create help content** - Write user-friendly explanations
3. **Build reusable help component** - Make it easy to add help anywhere
4. **Integrate help buttons** - Add them to key UI locations
5. **Test the system** - Ensure help is discoverable and useful

### 🧠 **Content Guidelines:**

#### User-Facing Help Should:
- Use plain language, not technical jargon
- Include step-by-step workflows
- Provide context for WHY someone would use this feature
- Give pro tips and best practices
- Address common confusion points
- Include troubleshooting for typical issues

#### Developer Notes Should:
- Document critical constraints and "never do this" warnings
- Explain key implementation decisions
- List common bugs and how to avoid them
- Provide file structure and data flow information
- Include testing scenarios and edge cases

### 🎯 **Success Criteria:**

- **New developers** can understand any feature by reading the feature map comments
- **Users** can get unstuck by clicking help buttons
- **Future you** won't have to reverse-engineer your own code
- **LLMs** won't go in circles looking for files because everything is documented
- **Critical constraints** are prominently documented to prevent breaking changes

### 📝 **Deliverables:**

1. Feature map comments added to all major component files
2. Central help registry with comprehensive content
3. Reusable help button/modal component
4. Help buttons integrated into key UI locations
5. Documentation of the help system itself for future maintenance

Focus on making this system **self-documenting** and **easy to extend** - future features should be able to plug into this system easily.
```

---

## 🎯 **Customization Notes**

### **For Different Tech Stacks:**
- **React/Vue/Angular**: Adjust component syntax and import patterns
- **Backend APIs**: Focus on endpoint documentation and data flow
- **Mobile Apps**: Consider in-app tutorials and contextual help
- **CLI Tools**: Add help commands and man page generation

### **For Different Project Types:**
- **SaaS Products**: Emphasize user workflows and feature discovery
- **Developer Tools**: Focus on API documentation and integration guides
- **Internal Tools**: Prioritize troubleshooting and maintenance docs
- **Open Source**: Include contribution guidelines and architecture docs

### **Scaling the System:**
- Start with 3-5 most complex features
- Add help content incrementally
- Create templates for common help patterns
- Build automated help content validation
- Consider help content versioning for major releases