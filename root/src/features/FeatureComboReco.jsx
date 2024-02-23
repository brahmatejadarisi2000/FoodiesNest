import { useForm, Controller } from "react-hook-form";
import openai from "../utils/openai";
import { useState } from "react";
import { setLoading } from "../store/loading/loading.slice";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoadingSelector } from "../store/loading/loading.selector";

const FeatureComboReco = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoadingSelector);

  const onSubmit = async (data) => {
    setSuggestions([]);
    dispatch(setLoading(true));

    const gptQuery = `Act as a combo recommendation system and suggest some combos for the query ${data.item}. Only give me names of 20 combos with respect to the query and please separate combos by commas. Don't give me any message; just give me data without numbers.`;

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      setSuggestions(gptResults.choices[0].message.content?.split(","));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="pair-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="item"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <>
              <input
                type="text"
                {...field}
                className={`input-suggestions-search ${
                  errors.item ? "error" : ""
                }`}
                placeholder={"Explore Flavorful Matches Using AI"}
                autoComplete="off"
              />
              {errors.item && (
                <span className="error-message">{errors.item.message}</span>
              )}
            </>
          )}
        />

        <button type="submit">{"Get Combos"}</button>
      </form>

      <div className="suggestion-container">
        {suggestions.length > 0
          ? suggestions.map((suggestion, index) => (
              <div key={index} className="suggestions">
                {suggestion}
              </div>
            ))
          : !isLoading && <h1>{"No Data Found"}</h1>}
      </div>
    </div>
  );
};

export default FeatureComboReco;
