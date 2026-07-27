import streamlit as st
import pandas as pd
import altair as alt

# --- Page Config ---
st.set_page_config(
    page_title="Extracurricular Analytics Dashboard",
    layout="wide"
)

# --- Radix-inspired CSS ---
st.markdown("""
<style>

:root {
    --green-1: #f0fdf4;
    --green-2: #dcfce7;
    --green-3: #bbf7d0;
    --green-4: #86efac;
    --green-5: #4ade80;
    --green-6: #22c55e;
    --green-7: #16a34a;
    --green-8: #15803d;
    --green-9: #166534;
    --radius: 12px;
}

/* Page background */
body {
    background-color: var(--green-1);
}

/* Card-like containers */
.block-container {
    padding-top: 2rem;
}

div[data-testid="stMarkdownContainer"] {
    background: white;
    padding: 1.5rem;
    border-radius: var(--radius);
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    margin-bottom: 1.5rem;
}

/* Headers */
h1, h2, h3 {
    color: var(--green-9);
    font-weight: 600;
}

/* Tables */
table {
    border-radius: var(--radius);
    overflow: hidden;
}

thead {
    background-color: var(--green-3);
}

tbody tr:nth-child(even) {
    background-color: var(--green-2);
}

</style>
""", unsafe_allow_html=True)

# --- Title ---
st.title("Extracurricular Program Analytics")

# --- Sample Data ---
enrollment_data = pd.DataFrame({
    "Year": ["2022", "2023", "2024", "2025"],
    "Enrollment": [120, 150, 180, 210]
})

participation_data = pd.DataFrame({
    "Program": ["Sports", "Music", "STEM Club", "Art", "Drama"],
    "Participation": [85, 60, 40, 55, 30]
})

operations_data = pd.DataFrame({
    "Metric": ["Budget Used (%)", "Avg. Attendance", "Staff Hours / Week"],
    "Value": [72, 48, 120]
})

# --- Layout ---
col1, col2 = st.columns(2)

with col1:
    st.subheader("Enrollment Trends")
    chart = (
        alt.Chart(enrollment_data)
        .mark_line(point=True, color="#22c55e")
        .encode(x="Year", y="Enrollment")
        .properties(height=300)
    )
    st.altair_chart(chart, use_container_width=True)

with col2:
    st.subheader("Participation Levels by Program")
    bar_chart = (
        alt.Chart(participation_data)
        .mark_bar(color="#4ade80")
        .encode(x="Program", y="Participation")
        .properties(height=300)
    )
    st.altair_chart(bar_chart, use_container_width=True)

st.subheader("Operational Data Overview")
st.table(operations_data)
