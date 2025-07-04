import React, { useState } from 'react';

interface FormData {
  carModel: string;
  carYear: string;
  customerName: string;
}

interface FormErrors {
  carModel?: string;
  carYear?: string;
  customerName?: string;
}

const PriceForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    carModel: '',
    carYear: '',
    customerName: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate car model
    if (!formData.carModel.trim()) {
      newErrors.carModel = 'กรุณาระบุรุ่นรถยนต์';
    } else if (formData.carModel.trim().length < 2) {
      newErrors.carModel = 'รุ่นรถยนต์ต้องมีอย่างน้อย 2 ตัวอักษร';
    }

    // Validate car year
    if (!formData.carYear.trim()) {
      newErrors.carYear = 'กรุณาระบุปีที่ผลิต';
    } else {
      const year = parseInt(formData.carYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1990 || year > currentYear + 1) {
        newErrors.carYear = `ปีที่ผลิตต้องอยู่ระหว่าง 1990 - ${currentYear + 1}`;
      }
    }

    // Validate customer name
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'กรุณาระบุชื่อของคุณ';
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      alert('ขอบคุณที่สนใจ! เราจะติดต่อกลับภายใน 5 นาที เพื่อส่งราคาประเมินรถยนต์ของคุณ');
      
      // Reset form
      setFormData({
        carModel: '',
        carYear: '',
        customerName: ''
      });
      setErrors({});
      
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="price-form">
      <form onSubmit={handleSubmit} role="form" aria-label="แบบฟอร์มเช็คราคารถยนต์มือสอง">
        <div className="form-group">
          <label htmlFor="carModel">รุ่นรถยนต์</label>
          <input
            type="text"
            id="carModel"
            name="carModel"
            value={formData.carModel}
            onChange={handleInputChange}
            placeholder="เช่น Camry, Civic, Almera, Vios, City"
            required
            aria-required="true"
            aria-describedby="model-help"
            className={errors.carModel ? 'error' : ''}
          />
          <small id="model-help">ระบุรุ่นรถยนต์ เช่น Camry, Civic, Vios</small>
          {errors.carModel && <div className="error-message">{errors.carModel}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="carYear">ปีที่ผลิตรถยนต์</label>
          <input
            type="text"
            id="carYear"
            name="carYear"
            value={formData.carYear}
            onChange={handleInputChange}
            placeholder="โปรดระบุเป็นปี ค.ศ. เช่น 2019"
            required
            aria-required="true"
            className={errors.carYear ? 'error' : ''}
          />
          {errors.carYear && <div className="error-message">{errors.carYear}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="customerName">ชื่อของคุณ</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
            aria-required="true"
            className={errors.customerName ? 'error' : ''}
          />
          {errors.customerName && <div className="error-message">{errors.customerName}</div>}
        </div>

        <div className="submit-box">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
            aria-describedby="submit-help"
          >
            {isSubmitting ? 'กำลังส่งข้อมูล...' : 'เช็คราคารถมือสองฟรี!'}
          </button>
          <br />
          <small id="submit-help">กดเพื่อส่งข้อมูลและรับราคาประเมินฟรี</small>
        </div>
      </form>
    </div>
  );
};

export default PriceForm;