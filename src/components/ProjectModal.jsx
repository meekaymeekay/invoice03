import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: #232426;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #444;
`;

const ModalTitle = styled.div`
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
`;

const ModalClose = styled.button`
  background: #666;
  border: none;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 12px;
  &:hover {
    background: #555;
  }
`;

const FormSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.div`
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ModalLabel = styled.label`
  color: #b48a5a;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
`;

const ModalInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #444;
  background: #18191b;
  color: #fff;
  font-size: 0.9rem;
  &:focus {
    border: 1px solid #b48a5a;
    outline: none;
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  min-width: 160px;
  flex-shrink: 0;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #8fd19e;
  margin-right: 8px;
`;

const DateInput = styled.input`
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #444;
  background: #18191b;
  color: #fff;
  font-size: 0.85rem;
  width: 100px;
  &:focus {
    border: 1px solid #b48a5a;
    outline: none;
  }
`;

const ProductionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

const ProductionDots = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-right: 12px;
`;

const ProductionDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#8fd19e' : '#444'};
  cursor: pointer;
`;

const ProductionStage = styled.span`
  color: #b48a5a;
  font-size: 0.75rem;
  margin-left: 8px;
  margin-right: 8px;
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #444;
  background: #18191b;
  color: #fff;
  font-size: 0.9rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  &:focus {
    border: 1px solid #b48a5a;
    outline: none;
  }
`;

const ErrorMsg = styled.div`
  color: #ff6a6a;
  font-size: 0.85rem;
  margin-top: 4px;
`;

const SaveButton = styled.button`
  background: #8fd19e;
  border: none;
  color: #232426;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #7bc88b;
  }
  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const ProjectModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    // Design Approval
    designApprovalComplete: false,
    // Cemetery Submission
    cemeterySubmissionDate: '',
    // Cemetery Approval
    cemeteryApprovalComplete: false,
    cemeteryApprovalDate: '',
    // Stone Ordered
    stoneOrderedComplete: false,
    stoneOrderedDate: '',
    // Stone Received
    stoneReceivedComplete: false,
    stoneReceivedDate: '',
    // Production
    productionComplete: false,
    productionStage: 0, // 0-3 for the dots
    // Photo Ordered
    photoOrderedDate: '',
    // Photo Received
    photoReceivedComplete: false,
    photoReceivedDate: '',
    // Foundation
    foundationComplete: false,
    foundationDate: '',
    // Paid Off
    paidOffComplete: false,
    paidOffDate: '',
    // Set
    setComplete: false,
    setDate: '',
    // Notes
    notes: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleClose = () => {
    setFormData({
      name: '',
      designApprovalComplete: false,
      cemeterySubmissionDate: '',
      cemeteryApprovalComplete: false,
      cemeteryApprovalDate: '',
      stoneOrderedComplete: false,
      stoneOrderedDate: '',
      stoneReceivedComplete: false,
      stoneReceivedDate: '',
      productionComplete: false,
      productionStage: 0,
      photoOrderedDate: '',
      photoReceivedComplete: false,
      photoReceivedDate: '',
      foundationComplete: false,
      foundationDate: '',
      paidOffComplete: false,
      paidOffDate: '',
      setComplete: false,
      setDate: '',
      notes: ''
    });
    setError('');
    onClose();
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      setError('Name is required.');
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      title: formData.name,
      updated: new Date().toLocaleDateString(),
      ...formData
    };

    onSave(newProject);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalBox>
        <ModalHeader>
          <ModalTitle>Start New Project</ModalTitle>
          <div>
            <SaveButton onClick={handleSave}>
              SAVE
            </SaveButton>
            <ModalClose onClick={handleClose}>CLOSE</ModalClose>
          </div>
        </ModalHeader>

        <FormSection>
          <FormGroup>
            <ModalLabel htmlFor="project-name">NAME:</ModalLabel>
            <ModalInput
              id="project-name"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              autoFocus
              placeholder="Enter project name..."
            />
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </FormGroup>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel>DESIGN APPROVAL</CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.designApprovalComplete}
              onChange={e => handleInputChange('designApprovalComplete', e.target.checked)}
            />
            <span style={{color: '#8fd19e', fontSize: '0.8rem', marginRight: '20px'}}>Complete</span>
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel>CEMETERY SUBMISSION</CheckboxLabel>
            <DateInput
              type="date"
              value={formData.cemeterySubmissionDate}
              onChange={e => handleInputChange('cemeterySubmissionDate', e.target.value)}
            />
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel>CEMETERY APPROVAL</CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.cemeteryApprovalComplete}
              onChange={e => handleInputChange('cemeteryApprovalComplete', e.target.checked)}
            />
            <span style={{color: '#8fd19e', fontSize: '0.8rem', marginRight: '20px'}}>Complete</span>
            <DateInput
              type="date"
              value={formData.cemeteryApprovalDate}
              onChange={e => handleInputChange('cemeteryApprovalDate', e.target.value)}
            />
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel>STONE ORDERED</CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.stoneOrderedComplete}
              onChange={e => handleInputChange('stoneOrderedComplete', e.target.checked)}
            />
            <span style={{color: '#8fd19e', fontSize: '0.8rem', marginRight: '20px'}}>Complete</span>
            <DateInput
              type="date"
              value={formData.stoneOrderedDate}
              onChange={e => handleInputChange('stoneOrderedDate', e.target.value)}
            />
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel>STONE RECEIVED</CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.stoneReceivedComplete}
              onChange={e => handleInputChange('stoneReceivedComplete', e.target.checked)}
            />
            <span style={{color: '#8fd19e', fontSize: '0.8rem', marginRight: '20px'}}>Complete</span>
            <DateInput
              type="date"
              value={formData.stoneReceivedDate}
              onChange={e => handleInputChange('stoneReceivedDate', e.target.value)}
            />
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <SectionTitle style={{color: '#8fd19e'}}>PRODUCTION</SectionTitle>
          <ProductionRow>
            <Checkbox
              type="checkbox"
              checked={formData.productionComplete}
              onChange={e => handleInputChange('productionComplete', e.target.checked)}
            />
            <span style={{color: '#8fd19e', fontSize: '0.8rem', marginRight: '20px'}}>Complete</span>
            <ProductionDots>
              <ProductionDot
                active={formData.productionStage >= 0}
                onClick={() => handleInputChange('productionStage', 0)}
              />
              <ProductionDot
                active={formData.productionStage >= 1}
                onClick={() => handleInputChange('productionStage', 1)}
              />
              <ProductionDot
                active={formData.productionStage >= 2}
                onClick={() => handleInputChange('productionStage', 2)}
              />
              <ProductionDot
                active={formData.productionStage >= 3}
                onClick={() => handleInputChange('productionStage', 3)}
              />
            </ProductionDots>
            <ProductionStage>Pulled</ProductionStage>
            <ProductionStage>Sands</ProductionStage>
            <ProductionStage>Laser</ProductionStage>
            <ProductionStage>Paint</ProductionStage>
          </ProductionRow>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel>PHOTO ORDERED</CheckboxLabel>
            <DateInput
              type="date"
              value={formData.photoOrderedDate}
              onChange={e => handleInputChange('photoOrderedDate', e.target.value)}
            />
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel>PHOTO RECEIVED</CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.photoReceivedComplete}
              onChange={e => handleInputChange('photoReceivedComplete', e.target.checked)}
            />
            <span style={{color: '#8fd19e', fontSize: '0.8rem', marginRight: '20px'}}>Complete</span>
            <DateInput
              type="date"
              value={formData.photoReceivedDate}
              onChange={e => handleInputChange('photoReceivedDate', e.target.value)}
            />
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel style={{color: '#8fd19e'}}>FOUNDATION</CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.foundationComplete}
              onChange={e => handleInputChange('foundationComplete', e.target.checked)}
            />
            <span style={{color: '#8fd19e', fontSize: '0.8rem', marginRight: '20px'}}>Complete</span>
            <DateInput
              type="date"
              value={formData.foundationDate}
              onChange={e => handleInputChange('foundationDate', e.target.value)}
            />
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel>PAID OFF</CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.paidOffComplete}
              onChange={e => handleInputChange('paidOffComplete', e.target.checked)}
            />
            <span style={{color: '#8fd19e', fontSize: '0.8rem', marginRight: '20px'}}>Complete</span>
            <DateInput
              type="date"
              value={formData.paidOffDate}
              onChange={e => handleInputChange('paidOffDate', e.target.value)}
            />
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <CheckboxRow>
            <CheckboxLabel>SET</CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={formData.setComplete}
              onChange={e => handleInputChange('setComplete', e.target.checked)}
            />
            <span style={{color: '#8fd19e', fontSize: '0.8rem', marginRight: '20px'}}>Complete</span>
            <DateInput
              type="date"
              value={formData.setDate}
              onChange={e => handleInputChange('setDate', e.target.value)}
            />
          </CheckboxRow>
        </FormSection>

        <FormSection>
          <SectionTitle>NOTES</SectionTitle>
          <NotesTextarea
            value={formData.notes}
            onChange={e => handleInputChange('notes', e.target.value)}
            placeholder="Enter notes..."
          />
        </FormSection>

      </ModalBox>
    </ModalOverlay>
  );
};

export default ProjectModal; 