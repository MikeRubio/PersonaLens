// Content script to analyze web pages
(function() {
  'use strict';

  // Analyze page for accessibility issues
  function analyzePage(persona: string) {
    const pageData = {
      url: window.location.href,
      title: document.title,
      textContent: extractTextContent(),
      colorInfo: extractColorInfo(),
      imageInfo: extractImageInfo(),
      formInfo: extractFormInfo(),
      navigationInfo: extractNavigationInfo(),
      headingStructure: extractHeadingStructure()
    };

    return pageData;
  }

  function extractTextContent() {
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, button, label');
    const textContent: string[] = [];
    
    textElements.forEach(element => {
      const text = element.textContent?.trim();
      if (text && text.length > 0) {
        textContent.push(text);
      }
    });

    return textContent.slice(0, 50); // Limit to prevent too much data
  }

  function extractColorInfo() {
    const colorInfo: Array<{element: string, color: string, background: string, contrast?: number}> = [];
    
    // Check common interactive elements
    const elements = document.querySelectorAll('a, button, input, .btn, [role="button"]');
    
    elements.forEach((element, index) => {
      if (index >= 20) return; // Limit to prevent too much data
      
      const styles = getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      colorInfo.push({
        element: element.tagName.toLowerCase(),
        color: color,
        background: backgroundColor
      });
    });

    return colorInfo;
  }

  function extractImageInfo() {
    const images = document.querySelectorAll('img');
    const imageInfo: Array<{src: string, alt: string, hasAlt: boolean}> = [];
    
    images.forEach((img, index) => {
      if (index >= 20) return; // Limit to prevent too much data
      
      imageInfo.push({
        src: img.src,
        alt: img.alt || '',
        hasAlt: Boolean(img.alt)
      });
    });

    return imageInfo;
  }

  function extractFormInfo() {
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input, select, textarea');
    
    const formInfo = {
      formCount: forms.length,
      inputs: Array.from(inputs).map(input => ({
        type: input.getAttribute('type') || input.tagName.toLowerCase(),
        hasLabel: Boolean(input.labels && input.labels.length > 0),
        placeholder: input.getAttribute('placeholder') || '',
        required: input.hasAttribute('required')
      }))
    };

    return formInfo;
  }

  function extractNavigationInfo() {
    const navElements = document.querySelectorAll('nav, [role="navigation"]');
    const links = document.querySelectorAll('a');
    
    const navigationInfo = {
      navCount: navElements.length,
      linkCount: links.length,
      navTexts: Array.from(navElements).map(nav => nav.textContent?.trim() || '').filter(text => text.length > 0)
    };

    return navigationInfo;
  }

  function extractHeadingStructure() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingStructure: Array<{level: number, text: string}> = [];
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent?.trim() || '';
      headingStructure.push({ level, text });
    });

    return headingStructure;
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'ping') {
      sendResponse({ status: 'ready' });
      return true;
    }
    
    if (request.action === 'analyzePage') {
      try {
        const pageData = analyzePage(request.persona);
        sendResponse(pageData);
      } catch (error) {
        sendResponse({ error: error.message });
      }
    }
    return true;
  });

})();