import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./VendorProfile.module.css";

const VendorProfile = ({ onNavigate }) => {
  const [currentVendor, setCurrentVendor] = useState(null);
  const [loginProvider, setLoginProvider] = useState("Email");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    displayName: "",
    businessName: "",
    phoneNumber: "",
    businessDescription: "",
  });

  const [originalFormData, setOriginalFormData] = useState({
    displayName: "",
    businessName: "",
    phoneNumber: "",
    businessDescription: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentVendor(user);

        // Determine login provider
        if (user.providerData.length > 0) {
          const provider = user.providerData[0].providerId;
          if (provider === "google.com") {
            setLoginProvider("Google");
          } else if (provider === "github.com") {
            setLoginProvider("GitHub");
          } else {
            setLoginProvider("Email");
          }
        }

        // Load vendor profile data from localStorage
        const vendorId = user.uid;
        const savedProfile = localStorage.getItem(`vendor_profile_${vendorId}`);
        if (savedProfile) {
          try {
            const profileData = JSON.parse(savedProfile);
            setFormData(profileData);
            setOriginalFormData(profileData);
          } catch (error) {
            console.error("Error loading profile data:", error);
          }
        } else {
          // Initialize with vendor's display name if available
          const initialData = {
            displayName: user.displayName || "",
            businessName: "",
            phoneNumber: "",
            businessDescription: "",
          };
          setFormData(initialData);
          setOriginalFormData(initialData);
        }
      } else {
        setCurrentVendor(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - revert to original data
      setFormData(originalFormData);
    }
    setIsEditing(!isEditing);
    setSuccessMessage("");
  };

  const handleSave = () => {
    if (!currentVendor) return;

    setIsSaving(true);
    try {
      const vendorId = currentVendor.uid;
      localStorage.setItem(
        `vendor_profile_${vendorId}`,
        JSON.stringify(formData)
      );

      // Update original data to reflect saved changes
      setOriginalFormData(formData);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToDashboard = () => {
    onNavigate("vendor-dashboard");
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      onNavigate("landing");
    });
  };

  if (!currentVendor) {
    return (
      <div className={styles.profileContainer}>
        <p className={styles.loadingText}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Vendor Profile</h1>
          <div className={styles.userActions}>
            <button
              className={styles.button}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <h2 className={styles.profileTitle}>Profile Information</h2>
              <button
                className={`${styles.editButton} ${
                  isEditing ? styles.cancel : ""
                }`}
                onClick={handleEditToggle}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {successMessage && (
              <div className={styles.successMessage}>{successMessage}</div>
            )}

            <form className={styles.profileForm}>
              {/* Editable Fields */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Editable Information</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="displayName" className={styles.label}>
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`${styles.input} ${
                      !isEditing ? styles.disabled : ""
                    }`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="businessName" className={styles.label}>
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`${styles.input} ${
                      !isEditing ? styles.disabled : ""
                    }`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phoneNumber" className={styles.label}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`${styles.input} ${
                      !isEditing ? styles.disabled : ""
                    }`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="businessDescription" className={styles.label}>
                    Business Description
                  </label>
                  <textarea
                    id="businessDescription"
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`${styles.textarea} ${
                      !isEditing ? styles.disabled : ""
                    }`}
                    rows="5"
                  />
                </div>
              </div>

              {/* Non-Editable Fields */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Account Information</h3>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    value={currentVendor.email}
                    disabled
                    className={`${styles.input} ${styles.disabled}`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Login Provider</label>
                  <input
                    type="text"
                    value={loginProvider}
                    disabled
                    className={`${styles.input} ${styles.disabled}`}
                  />
                </div>
              </div>

              {isEditing && (
                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.saveButton}
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>

            <div className={styles.navigationButtons}>
              <button
                className={styles.backButton}
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorProfile;
