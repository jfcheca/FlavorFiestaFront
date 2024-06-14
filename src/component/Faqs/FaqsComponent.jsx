import React, { useState } from 'react';
import { faqsData } from './faqsData.ts';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqsComponent = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className="faqs-container">
      {faqsData.map((faq) => (
        <Accordion 
          key={faq.id}
          expanded={expanded === `panel${faq.id}`}
          onChange={handleChange(`panel${faq.id}`)}
          sx={{
            borderBottom: '2px solid #8FA206', 
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: expanded === `panel${faq.id}` ? '#fff' : '#CC2D4A' }} />}
            sx={{
              backgroundColor: expanded === `panel${faq.id}` ? '#8FA206' : 'transparent',
              '& .MuiTypography-root': {
                fontFamily: 'Poppins, sans-serif', fontWeight: '500', 
                color: expanded === `panel${faq.id}` ? '#fff' : '#000', 
              },
            }}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontFamily: 'Poppins, sans-serif' }}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqsComponent;
